const { Router } = require("express");
const {
  createMainTreatment,
  deleteMainTreatment,
  getAllMainTreatments,
  getMainTreatmentById,
  updateMainTreatment,
} = require("../controller/treatment/treatmentController.js");

const router = Router();

router.post("/", createMainTreatment);
router.get("/", getAllMainTreatments);
router.get("/:id", getMainTreatmentById);
router.put("/:id", updateMainTreatment);
router.delete("/:id", deleteMainTreatment);

module.exports = router
