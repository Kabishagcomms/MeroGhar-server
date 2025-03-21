//this is index router where all the routes will be registered

import { Router } from "express";
import authRoutes from "../routes/auth/auth.routes";
import userRoutes from "../routes/user/user.routes";
import adminRoutes from "../routes/admin/admin.routes";
import propertyRoutes from "../routes/property/property.routes";
import notificationRoutes from '../routes/notification/notification.routes'
import contatctRoutes from '../routes/contactus/contact.route'
import subscriptionRoutes from '../routes/subscription/subscription.routes'

const router = Router();

//simply register the route here
//routes registration  before defning any routes
//define prefix else nothing but the routepath should be uniqe
router.use("/auth/v1", authRoutes);
router.use("/user/v1", userRoutes);
router.use("/admin/v1", adminRoutes);
router.use("/notification/v1", notificationRoutes);
router.use("/subscription/v1", subscriptionRoutes)
router.use("/property/v1", propertyRoutes);
router.use("/contact/v1", contatctRoutes)


export default router;
