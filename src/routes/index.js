const { Router } = require("express");
const technologyRoutes = require("../routes/technologyRouter");
const serviceRoutes = require("../routes/serviceRouter");
const treatmentRouter = require("../routes/treatmentRouter");
const newsletterRouter = require("../routes/newsletter");

const router = Router();

router.use("/technology", technologyRoutes);
router.use("/services", serviceRoutes);
router.use("/treatment", treatmentRouter);
router.use("/newsletter", newsletterRouter);

module.exports = router;
