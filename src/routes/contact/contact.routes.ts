import { Router } from "express";
import { submitContactFormC } from "../../controllers/contact/contact.controller";

const router = Router();

router.post("/contactUs", submitContactFormC);

export default router;