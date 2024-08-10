import Category from '../database/models/category.js';

// Obtener todas las categorías
export const getAllCategories = async (req, res) => {
	try {
		const categories = await Category.findAll();
		res.status(200).json({
			ok: true,
			status: 200,
			data: categories
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			status: 500,
			message: 'Error getting categories',
			error: error.message
		});
	}
};

// Obtener una categoría por ID
export const getCategoryById = async (req, res) => {
	try {
		const { id } = req.params;
		const category = await Category.findByPk(id);
		if (!category) {
			return res.status(404).json({
				ok: false,
				status: 404,
				message: 'Category not found'
			});
		}
		res.status(200).json({
			ok: true,
			status: 200,
			data: category
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			status: 500,
			message: `Error getting category ${id}`,
			error: error.message
		});
	}
};

// Crear una nueva categoría
export const postCategory = async (req, res) => {
	try {
		const { name, description, imageUrl, id } = req.body;

		if (!name) {
			return res.status(400).json({
				ok: false,
				status: 400,
				message: 'Category name is required'
			});
		}
		const newCategory = await Category.create({
			id,
			name,
			description,
			imageUrl
		});
		res.status(201).json({
			ok: true,
			status: 201,
			data: newCategory
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			status: 500,
			message: 'Error creating category',
			error: error.message
		});
	}
};
