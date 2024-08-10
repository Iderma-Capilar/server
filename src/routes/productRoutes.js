import {Router} from 'express'
import { getAllProducts, getProductById} from '../controller/productController.js'

const router = Router()
router.get('/', getAllProducts)
router.get('/:id', getProductById);

export default router;