import { Router } from "express";
import {
  banUnbanUserC,
  getAllUsersC,
  getDashBoardDataC,
  getKycRequestsC,
  getUserKycC,
  registerAdminC,
  verifyKycRequestsC,
} from "../../controllers/admin/admin.controller";
import {
  verifyaccessToken,
  verifyRole,
} from "../../middlewares/auth.middleware";
import { validateInput } from "../../middlewares/inputvalidation";

const router = Router();

router.use(verifyaccessToken(true));
router.use(verifyRole(true));

//will not get private information just some infos
router.get("/allUsers", getAllUsersC);

router.get("/dashBoardData", getDashBoardDataC);

//will fetch users private information
router.get("/getUser/:id", getUserKycC);

//ban unban user
router.patch("/banUnbanUser/:id", banUnbanUserC);

//search api only left

router.post("/registerAdmin", validateInput, registerAdminC);

router.get("/kycRequests", getKycRequestsC);
router.patch("/kycRequests/:id", verifyKycRequestsC);

export default router;
