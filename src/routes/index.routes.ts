//this is index router where all the routes will be registered

import { Router } from "express";
import authRoutes from "../routes/auth/auth.routes";
import userRoutes from "../routes/user/user.routes";

const router = Router();

//simply register the route here
//routes registration  before defning any routes
//define prefix else nothing but the routepath should be uniqe
router.use("/auth/v1", authRoutes);
router.use("/user/v1", userRoutes);

export default router;
