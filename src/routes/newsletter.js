import { Router } from "express";
import { newUser } from "../controller/newsletterController/newsletterController.js";

const router = Router();

router.post("/", newUser);

export default router;
