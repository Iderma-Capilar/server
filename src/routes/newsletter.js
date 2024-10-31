const { Router } = require("express");
const {
  newUser,
  getAllUsers,
} = require("../controller/newsletterController/newsletterController.js");

const router = Router();

router.post("/", newUser);
router.get("/", getAllUsers);

module.exports = router
