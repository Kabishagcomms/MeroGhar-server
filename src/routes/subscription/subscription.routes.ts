import { Router } from "express";
import { subscribeC } from "../../controllers/subscription/subscription.controller";

const router = Router();

router.post("/subscribe", subscribeC);

export default router;