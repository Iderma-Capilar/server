import Category from "../database/models/category.js";
import Service from "../database/models/services.js";

export const getAllProducts = async (req, res) => {
  try {
    const service = await Service.findAll({
      include: [{ model: Category, as: "category" }],
    });
    res.status(200).json({
      ok: true,
      status: 200,
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error getting service",
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id, {
      include: [{ model: Category, as: "category" }],
    });
    if (!service) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "service not found",
      });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      data: service,
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

    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "service not found",
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

    await service.update({
      name,
      image,
      miniature,
      description,
      categoryId,
    });

    res.status(200).json({
      ok: true,
      status: 200,
      data: service,
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

    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "service not found",
      });
    }

    await service.destroy();

    res.status(200).json({
      ok: true,
      status: 200,
      message: "service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error deleting service",
      error: error.message,
    });
  }
};
