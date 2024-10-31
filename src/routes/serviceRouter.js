const { Router } = require("express");
const {
  createService,
  deleteService,
  getAllServices,
  getServiceById,
  updateService,
} = require("../controller/servicesC/serviceControllers.js");

const router = Router();

router.post("/", createService);
router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

module.exports = router
