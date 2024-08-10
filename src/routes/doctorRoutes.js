import { Router } from 'express';
import { getAllDoctors, getDoctoById } from '../controller/doctorController.js';

const router = Router();

router.get('/', getAllDoctors);
router.get('/:id', getDoctoById);

export default router;
