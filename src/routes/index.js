import { Router } from "express";
import categoryRoutes from "./categoryRoutes.js";
import technologyRoutes from "../routes/technologyRouter.js";
import serviceRoutes from "../routes/serviceRouter.js";

const router = Router();

router.use("/categories", categoryRoutes);
router.use("/technology", technologyRoutes);
router.use("services", serviceRoutes);

export default router;
