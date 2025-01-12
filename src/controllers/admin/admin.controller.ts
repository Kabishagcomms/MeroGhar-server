import { Request, Response } from "express";
import {
  getKycRequestsS,
  getAllUserS,
  getUserKycS,
  registerAdminS,
  verifyKycRequestsS,
  banUnbanUserS,
  getDashBoardDataS,
} from "../../services/admin/admin.service";
import joi from "joi";

export const getDashBoardDataC = async (req: Request, res: Response) => {
  try {
    const data = await getDashBoardDataS();
    if (data) return res.status(200).json({ success: true, data });
  } catch (e: any) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

export const getAllUsersC = async (req: Request, res: Response) => {
  try {
    const users = await getAllUserS(
      req.query.page as string,
      req.query.limit as string,
      req.query.search ? (req.query.search as string) : ""
    );
    if (users) return res.status(200).json({ success: true, users });
  } catch (e: any) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

export const banUnbanUserC = async (req: Request, res: Response) => {
  try {
    const banSchema = joi
      .object({
        ban: joi.boolean().required(),
        message: joi.string().allow("").optional(),
      })
      .required();

    const { error, value } = banSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error)
      return res.status(422).json({ success: false, error: error.message });

    const banunBanUser = await banUnbanUserS(
      req.params.id,
      req.body.ban,
      req.body.message
    );
    if (banunBanUser)
      return res.status(200).json({
        success: true,
        message: `${
          req.body.ban
            ? "user Banned SuccessFully"
            : "User UnBanned Successfully"
        }`,
      });
  } catch (e: any) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

export const registerAdminC = async (req: Request, res: Response) => {
  try {
    const { userId, password } = req.body;
    const newAdmin = await registerAdminS(userId, password);
    if (newAdmin)
      return res.status(200).json({
        success: true,
        message: `Admin successfully registered with id: ${userId}`,
      });
  } catch (e: any) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

export const getKycRequestsC = async (req: Request, res: Response) => {
  try {
    const kycRequests = await getKycRequestsS(
      req.query.page as string,
      req.query.limit as string
    );
    if (kycRequests)
      return res.status(200).json({ success: true, kycRequests });
  } catch (e: any) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};

export const getUserKycC = async (req: Request, res: Response) => {
  try {
    const userData = await getUserKycS(req.params.id);
    if (userData) return res.status(200).json({ success: true, userData });
  } catch (e: any) {
    console.log(e);
    return res.status(400).json({ success: false, error: e.message });
  }
};

export const verifyKycRequestsC = async (req: Request, res: Response) => {
  try {
    const kycVerify = joi.object({
      isVerified: joi.boolean().required(),
      message: joi.string().optional(),
    });

    const { error, value } = kycVerify.validate(req.body, {
      abortEarly: false,
    });
    if (error)
      return res.status(400).json({ success: false, message: error.message });

    const requestVerified = await verifyKycRequestsS(
      req.userData.docId,
      req.params.id,
      req.body
    );
    //since error thrown is the failure otherwise verified or not is part of the query so its ok
    if (requestVerified) return res.status(200).json({ success: true });
  } catch (e: any) {
    console.log(e);
    res.status(400).json({ success: false, error: e.message });
  }
};
