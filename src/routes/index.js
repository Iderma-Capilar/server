import { Router } from "express";
import technologyRoutes from "../routes/technologyRouter.js";
import serviceRoutes from "../routes/serviceRouter.js";
import treatmentRouter from "../routes/treatmentRouter.js";

const router = Router();

router.use("/technology", technologyRoutes);
router.use("/services", serviceRoutes);
router.use("/treatment", treatmentRouter);

export default router;
