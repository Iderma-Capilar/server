import ServiceImage from "../database/models/servicios/serviceImage.js";
import Service from "../database/models/servicios/services.js";
import ServiceVideo from "../database/models/servicios/serviceVideo.js";

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      include: [
        { model: ServiceImage, as: "images" },
        { model: ServiceVideo, as: "videos" },
      ],
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
      include: [
        { model: ServiceImage, as: "images" },
        { model: ServiceVideo, as: "videos" },
      ],
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
      duration,
      recommendations,
      qa,
    } = req.body;

    const newService = await Service.create({
      name,
      slogan,
      image,
      description,
      main_treatment,
      secondary_treatment,
      duration,
      recommendations,
      qa,
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
      duration,
      recommendations,
      qa,
    } = req.body;

    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Service not found",
      });
    }

    await service.update({
      name,
      slogan,
      image,
      description,
      main_treatment,
      secondary_treatment,
      duration,
      recommendations,
      qa,
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
