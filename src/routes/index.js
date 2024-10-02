import { Router } from "express";
import technologyRoutes from "../routes/technologyRouter.js";
import serviceRoutes from "../routes/serviceRouter.js";
import treatmentRouter from "../routes/treatmentRouter.js";
import newsletterRouter from "../routes/newsletter.js"

const router = Router();

router.use("/technology", technologyRoutes);
router.use("/services", serviceRoutes);
router.use("/treatment", treatmentRouter);
router.use("/newsletter",  newsletterRouter);


export default router;
