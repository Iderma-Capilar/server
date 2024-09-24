import { sequelize } from "../database/index.js";
import Benefit from "../database/models/benefit/benefit.js";
import QuestionAnswer from "../database/models/qa/qa.js";
import Duration from "../database/models/duration/duration.js";
import MainTreatment from "../database/models/mainTreatment/mainTreatment.js";
import Recommendations from "../database/models/servicios/recommendations.js";
import SecondaryTreatment from "../database/models/servicios/secondaryTreatment.js";
import ServiceImage from "../database/models/servicios/serviceImage.js";
import Service from "../database/models/servicios/services.js";
import ServiceVideo from "../database/models/servicios/serviceVideo.js";

//--------------------------------------------------------------------------------------------
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      include: [
        { model: ServiceImage, as: "images" },
        { model: ServiceVideo, as: "videos" },
        { model: QuestionAnswer, as: "qa" },
        { model: MainTreatment, as: "mainTreatments" },
        { model: SecondaryTreatment, as: "secondaryTreatments" },
        { model: Benefit, as: "serviceBenefits" },
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

//--------------------------------------------------------------------------------------------

export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id, {
      include: [
        { model: ServiceImage, as: "images" },
        { model: ServiceVideo, as: "videos" },
        { model: QuestionAnswer, as: "qa" },
        { model: MainTreatment, as: "mainTreatments" },
        { model: SecondaryTreatment, as: "secondaryTreatments" },
        { model: Benefit, as: "serviceBenefits" },
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

//--------------------------------------------------------------------------------------------

// CREAR SERVICIO NUEVO
export const createService = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      name,
      slogan,
      description,
      duration = {},
      recommendations = [],
      videos = [],
      images = [],
      questions = [],
      mainTreatments = [],
      secondaryTreatments = [],
      benefits = [],
    } = req.body;

    // Validar campos obligatorios
    if (!name || !description) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Name and description are required.",
      });
    }

    if (!mainTreatments.length) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "At least one main treatment is required.",
      });
    }

    // Crear el nuevo servicio
    const newService = await Service.create(
      {
        name,
        slogan,
        description,
      },
      { transaction }
    );

    // Función para crear asociaciones
    const createAssociations = async (
      Model,
      data,
      serviceId,
      extraFields = {}
    ) => {
      if (data.length) {
        await Model.bulkCreate(
          data.map((item) => ({ ...item, serviceId, ...extraFields })),
          { transaction }
        );
      }
    };

    // Crear asociaciones: videos, imágenes, preguntas, tratamientos, beneficios
    await createAssociations(ServiceVideo, videos, newService.id);
    await createAssociations(ServiceImage, images, newService.id);
    await createAssociations(QuestionAnswer, questions, newService.id, {
      qaType: "service",
      productId: newService.id,
    });
    await createAssociations(MainTreatment, mainTreatments, newService.id);
    await createAssociations(
      SecondaryTreatment,
      secondaryTreatments,
      newService.id,
      {}
    );
    await createAssociations(Benefit, benefits, newService.id, {
      benefit_type: "service",
      productId: newService.id,
    });

    // Crear la duración del servicio
    if (duration) {
      await Duration.create(
        { ...duration, serviceId: newService.id },
        { transaction }
      );
    }

    // Crear las recomendaciones asociadas
    await createAssociations(Recommendations, recommendations, newService.id);

    // Confirmar transacción
    await transaction.commit();

    // Obtener servicio con todas las asociaciones, incluyendo Duration y Recommendations
    const serviceWithAssociations = await Service.findByPk(newService.id, {
      include: [
        { model: ServiceImage, as: "images" },
        { model: ServiceVideo, as: "videos" },
        { model: QuestionAnswer, as: "qa" },
        { model: MainTreatment, as: "mainTreatments" },
        { model: SecondaryTreatment, as: "secondaryTreatments" },
        { model: Benefit, as: "serviceBenefits" },
        { model: Duration, as: "duration" },
        { model: Recommendations, as: "recommendations" },
      ],
    });

    res.status(201).json({
      ok: true,
      status: 201,
      data: serviceWithAssociations,
    });
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error creating service",
      error: error.message,
    });
  }
};

//--------------------------------------------------------------------------------------------

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

//--------------------------------------------------------------------------------------------

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
