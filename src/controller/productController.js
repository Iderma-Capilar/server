import Category from "../database/models/category.js";
import Product from "../database/models/product.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, as: "category" }],
    });
    res.status(200).json({
      ok: true,
      status: 200,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error getting products",
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: [{ model: Category, as: "category" }],
    });
    if (!product) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Product not found",
      });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error getting product",
      error: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, image, miniature, description, categoryId } = req.body;

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Invalid category ID",
      });
    }

    const newProduct = await Product.create({
      name,
      image,
      miniature,
      description,
      categoryId,
    });

    res.status(201).json({
      ok: true,
      status: 201,
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error creating product",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, miniature, description, categoryId } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Product not found",
      });
    }

    if (categoryId) {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(400).json({
          ok: false,
          status: 400,
          message: "Invalid category ID",
        });
      }
    }

    await product.update({
      name,
      image,
      miniature,
      description,
      categoryId,
    });

    res.status(200).json({
      ok: true,
      status: 200,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error updating product",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Product not found",
      });
    }

    await product.destroy();

    res.status(200).json({
      ok: true,
      status: 200,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error deleting product",
      error: error.message,
    });
  }
};
