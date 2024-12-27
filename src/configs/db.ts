import { connect } from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();
//return type of async function is promise
// mongodb+srv://nick11444:${process.env.dbPassword}@fypnikan.bud3xcp.mongodb.net/test

const dbConnect = async () => {
  try {
    await connect(
      `mongodb+srv://kabishag:${process.env.dbPassword}@meroghar.ah1tj.mongodb.net/?retryWrites=true&w=majority&appName=MeroGhar`
    );
    console.log("Database Connected");
  } catch (e) {
    const error = e as Error;
    console.error("Database connection error:", error.message);
  }
};

export default dbConnect;
