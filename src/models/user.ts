import { Schema, model, Types } from "mongoose";
import { IUser } from "../interfaces/dbInterface";

export const userSchema = new Schema(
  {
    //the length and pattern for the properties below will be validated in the client side so no need for server side error handling

    userId: {
      type: String,
      required: true,
      unique: true,
    },
    //usename in default can be user id and acts as display name
    userName: {
      type: String,
      required: true,
    },
    //only necessary for local login
    password: { type: String },
    //userid__profile

    //can be manually updated or if user logs in with google then it will be updated automatically
    email: {
      mail: { type: String, default: "" },
      isVerified: { type: Boolean, default: false },
    },

    //since i will be usig jwt for most of the verificaion purpose rather than generate own token
    token: String,
    //will contain the token value for token rotation
    refreshToken: [String],
  },
  { timestamps: true }
);

export const userModel = model<IUser>("Users", userSchema);
