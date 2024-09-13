import Category from "../database/models/category.js";
import Service from "../database/models/services.js";

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      include: [{ model: Category, as: "category" }],
    });
    res.status(200).json({
      ok: true,
      status: 200,
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error getting services",
      error: error.message,
    });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id, {
      include: [{ model: Category, as: "category" }],
    });
    if (!service) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Service not found",
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
      message: "Error getting service",
      error: error.message,
    });
  }
};

export const createService = async (req, res) => {
  try {
    const {
      name,
      slogan,
      image,
      description,
      main_treatment,
      secondary_treatment,
      benefits,
      duration,
      recommendations,
      qa,
      categoryId,
    } = req.body;

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Invalid category ID",
      });
    }

    const newService = await Service.create({
      name,
      slogan,
      image,
      description,
      main_treatment,
      secondary_treatment,
      benefits,
      duration,
      recommendations,
      qa,
      categoryId,
    });

    res.status(201).json({
      ok: true,
      status: 201,
      data: newService,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error creating service",
      error: error.message,
    });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      slogan,
      image,
      description,
      main_treatment,
      secondary_treatment,
      benefits,
      duration,
      recommendations,
      qa,
      categoryId,
    } = req.body;

    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Service not found",
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
      slogan,
      image,
      description,
      main_treatment,
      secondary_treatment,
      benefits,
      duration,
      recommendations,
      qa,
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
      message: "Error updating service",
      error: error.message,
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Service not found",
      });
    }

    await service.destroy();

    res.status(200).json({
      ok: true,
      status: 200,
      message: "Service deleted successfully",
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
