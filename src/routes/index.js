import { Router } from "express";
import technologyRoutes from "../routes/technologyRouter.js";
import serviceRoutes from "../routes/serviceRouter.js";

const router = Router();

router.use("/technology", technologyRoutes);
router.use("/services", serviceRoutes);

export default router;
