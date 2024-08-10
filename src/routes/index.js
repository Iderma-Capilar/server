import { Router } from 'express';
import categoryRoutes from './categoryRoutes.js';
import productRoutes from './productRoutes.js';
import doctorRoutes from '../routes/doctorRoutes.js';
const router = Router();

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/doctorRoutes', doctorRoutes);

export default router;
