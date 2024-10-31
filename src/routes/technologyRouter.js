const { Router } = require("express");
const {
  createTechnology,
  deleteTechnology,
  getAllTechnologies,
  getTechnologyById,
  updateTechnology,
} = require("../controller/technology/technologyController.js");

const router = Router();

router.post("/technologies", createTechnology);
router.get("/technologies", getAllTechnologies);
router.get("/technologies/:id", getTechnologyById);
router.put("/technologies/:id", updateTechnology);
router.delete("/technologies/:id", deleteTechnology);

module.exports = router
