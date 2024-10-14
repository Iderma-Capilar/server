import { Router } from "express";
import { newUser, getAllUsers } from "../controller/newsletterController/newsletterController.js";

const router = Router();

router.post("/", newUser);
router.get("/", getAllUsers);

export default router;
