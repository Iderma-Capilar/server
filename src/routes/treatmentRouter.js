import { Router } from "express";
import {
  createMainTreatment,
  deleteMainTreatment,
  getAllMainTreatments,
  getMainTreatmentById,
  updateMainTreatment,
} from "../controller/treatmentController.js";

const router = Router();

router.post("/", createMainTreatment);
router.get("/", getAllMainTreatments);
router.get("/:id", getMainTreatmentById);
router.put("/:id", updateMainTreatment);
router.delete("/:id", deleteMainTreatment);

export default router;