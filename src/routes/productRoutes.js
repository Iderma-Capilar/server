import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controller/productController.js";

const router = Router();
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/createProduct", createProduct);
router.delete("/deleteProduct:id", deleteProduct);
router.put("/updateProduct", updateProduct);

export default router;
