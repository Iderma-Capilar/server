import { Router } from 'express';
import {
	getAllCategories,
	getCategoryById,
	postCategory
} from '../controller/categoryController.js';

const router = Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/post_category', postCategory);

export default router;
