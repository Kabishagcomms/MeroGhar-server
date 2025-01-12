import { userModel } from "../../models/user";
import { hash } from "bcrypt";
import { IBooking, IUser, Property } from "../../interfaces/dbInterface";
import { verifyKyc } from "../../interfaces/admin";

import { sendMail } from "../../utils/zohoMailer";
import {
  adminPropTemplate,
  banUnbanPropTemplate,
  banUnbanUserTemplate,
  verifyKycTemplate,
} from "../../configs/mailtemplate";

interface Dash {
  totalUsers: number;
  activeUsers: number;
}

export const getDashBoardDataS = async (): Promise<Dash> => {
  try {
    const [totalUsers, activeUsers] = await Promise.all([
      userModel.countDocuments({ is_Admin: false }),
      userModel.countDocuments({ "isBanned.status": false, is_Admin: false }),
    ]);

    //

    return {
      totalUsers,
      activeUsers,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// paginated kyc requests and also saerch
export const getAllUserS = async (
  page: string,
  limit: string,
  search?: string
): Promise<IUser[]> => {
  try {
    if (search! !== "") {
      const users = await userModel
        .find({ userName: { $regex: search, $options: "i" }, is_Admin: false })
        .select("userName _id profileImg about isBanned");
      return users;
    }

    const newlimit = parseInt(limit);
    const newpage = parseInt(page);

    //since all admin have access to this simply fetch unverified property set in pending  .limit(newlimit*1).skip((newpage-1)*newlimit).sort({userId:"asc"}).
    const users = await userModel
      .find({ is_Admin: false })
      .select("userName _id profileImg about isBanned")
      .sort({ createdAt: -1, userName: "asc" })
      .skip((newpage - 1) * newlimit)
      .limit(newlimit * 1);
    if (!users) throw new Error("No user found");
    return users;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const banUnbanUserS = async (
  id: string,
  ban: boolean,
  message?: string
) => {
  try {
    const userExist = await userModel.findOne({ _id: id });
    if (!userExist) throw new Error("User Does not Exist");

    if (ban) {
      userExist.isBanned.status = true;
      userExist.isBanned.message = message!;
      await userExist.save();

      //send mail indicating user has been banned
      if (userExist.email.isVerified) {
        const mail = sendMail(
          banUnbanUserTemplate(
            userExist.userName,
            userExist.email.mail,
            true,
            message!
          )
        );
      }

      return true;
    }

    userExist.isBanned.status = false;
    userExist.isBanned.message = "";
    await userExist.save();

    if (userExist.email.isVerified) {
      const mail = sendMail(
        banUnbanUserTemplate(userExist.userName, userExist.email.mail, false)
      );
    }

    return true;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const registerAdminS = async (
  userId: string,
  password: string
): Promise<boolean> => {
  try {
    const userExist = await userModel.findOne({ userId: userId });
    if (userExist)
      throw new Error("User with id Already Exist,please enter new userId");

    //since no user create new user
    const newUser = await userModel.create({
      userId: userId,
      userName: userId,
      password: await hash(password, process.env.salt_rounds!),
      is_Admin: true,
    });

    //not necessary to call but call
    await newUser.save();
    if (!newUser) throw new Error("User failed to register");
    console.log(newUser._id);
    return true;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getUserKycS = async (id: string): Promise<Partial<IUser>> => {
  try {
    const userData = await userModel
      .findOne({ $or: [{ _id: id }, { userId: id }] })
      .select(
        "-password -token  -refreshToken  -is_Admin -wishList  -viewedProperty  "
      );
    if (!userData) throw new Error("Failed to fetch userData");
    return userData;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// paginated kyc requests
export const getKycRequestsS = async (
  page: string,
  limit: string
): Promise<IUser[]> => {
  try {
    const newlimit = parseInt(limit);
    const newpage = parseInt(page);

    //since all admin have access to this simply fetch unverified property set in pending  .limit(newlimit*1).skip((newpage-1)*newlimit).sort({userId:"asc"}).
    const kycRequests = await userModel
      .find({ "kyc.isVerified": false, "kyc.pending": true })
      .select("userId userName _id profileImg about")
      .sort({ userId: "asc", createdAt: -1 })
      .skip((newpage - 1) * newlimit)
      .limit(newlimit * 1);
    if (!kycRequests) throw new Error("No user need to be verified right now");
    return kycRequests;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const verifyKycRequestsS = async (
  adminId: string,
  id: string,
  kycData: verifyKyc
): Promise<boolean> => {
  try {
    //perform action according to verification status
    if (kycData.isVerified) {
      //check if the user has kyc info and not empty
      const checkKycData = userModel.findOne({
        _id: id,
        kycInfo: { $exist: true, $ne: {} },
      });
      if (!checkKycData)
        throw new Error("Invalid id and Misuse of admin detected");

      //since admin has verified and data is also valid now update the userDocument
      const verifyUser = await userModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            "kyc.isVerified": true,
            "kyc.message": "",
            "kyc.approvedBy": adminId,
            "kyc.pending": false,
          },
        },
        { new: true }
      );
      if (!verifyUser) throw new Error("user not able to verify");

      if (verifyUser.email.isVerified) {
        const notifyUser = sendMail(
          verifyKycTemplate(verifyUser.userName, verifyUser.email.mail, true)
        );
      }

      return true;
    }

    //since admin deemed kyc info to be invalid just provide the message to the user

    //just make sure the user account is not verified
    const userCheck = await userModel.findOne({
      _id: id,
      kyc: { isVerified: true },
    });
    if (userCheck)
      throw new Error(
        "User cant be done unverified since User is already verified"
      );

    const declineUser = await userModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          "kyc.isVerified": false,
          "kyc.message": kycData.message,
          "kyc.approvedBy": adminId,
          "kyc.pending": false,
        },
      }
    );
    if (!declineUser) throw new Error("User kyc Decline failed");

    if (declineUser.email.mail) {
      const notifyUser = sendMail(
        verifyKycTemplate(
          declineUser.userName,
          declineUser.email.mail,
          false,
          kycData.message
        )
      );
    }

    return true;
    //the default task would be clear admin kyc request either way
    // const deleteKycRequests=await userModel.updateMany({is_Admin:true},{
    //     "$pull":{
    //         "kycVerificationRequests":id
    //     }
    // })

    // if(!deleteKycRequests) throw new Error("Kyc Request delete failed")
  } catch (e) {
    console.log(e);
    throw e;
  }
};
