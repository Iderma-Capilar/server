import Category from "../database/models/category.js";
import Service from "../database/models/services.js";

// Obtener todas las categorías
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Service,
          as: "products",
        },
      ],
    });
    res.status(200).json({
      ok: true,
      status: 200,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error obteniendo categorías",
      error: error.message,
    });
  }
};

// Obtener una categoría por ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id, {
      include: [
        {
          model: Service,
          as: "products",
        },
      ],
    });
    if (!category) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Categoría no encontrada",
      });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: `Error obteniendo la categoría con ID ${id}`,
      error: error.message,
    });
  }
};

// Crear una nueva categoría
export const postCategory = async (req, res) => {
  try {
    const { name, slogan, description, image } = req.body;

    if (!name || !slogan || !description || !image) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message:
          "Todos los campos son obligatorios: name, slogan, description, image",
      });
    }

    const newCategory = await Category.create({
      name,
      slogan,
      description,
      image,
    });

    res.status(201).json({
      ok: true,
      status: 201,
      data: newCategory,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "El nombre de la categoría ya existe",
      });
    }

    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error creando la categoría",
      error: error.message,
    });
  }
};
