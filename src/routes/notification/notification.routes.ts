import { Router } from "express";
import { getNotificationsC, markNotificationAsReadC } from "../../controllers/notification/notification.controller";
import {
    verifyaccessToken,
    verifyRole,
  } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", verifyaccessToken(false), getNotificationsC);
router.patch("/:notificationId/read", verifyaccessToken(false), markNotificationAsReadC);

export default router;