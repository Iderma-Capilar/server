import { sequelize, createAssociations } from "../database/index.js";
import Benefit from "../database/models/benefit/benefit.js";
import QuestionAnswer from "../database/models/qa/qa.js";
import Duration from "../database/models/duration/duration.js";
import MainTreatment from "../database/models/mainTreatment/mainTreatment.js";
import Recommendations from "../database/models/servicios/recommendations.js";
import Service from "../database/models/servicios/services.js";

//--------------------------------------------------------------------------------------------
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      include: [
        { model: QuestionAnswer, as: "qa" },
        { model: MainTreatment, as: "mainTreatment" },
        { model: MainTreatment, as: "associatedMainTreatments" },
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
        { model: QuestionAnswer, as: "qa" },
        { model: MainTreatment, as: "mainTreatments" },
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
      mainTreatmentId = null,
      benefits = [],
    } = req.body;

    // Validar campos obligatorios
    if (!name || !description) {
      await transaction.rollback();
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Name and description are required.",
      });
    }

    // Crear el nuevo servicio
    const newService = await Service.create(
      {
        name,
        slogan,
        description,
        mainTreatmentId,
        videos,
        images
      },
      { transaction }
    );

    await createAssociations(
      QuestionAnswer,
      questions,
      newService.id,
      {
        qaType: "service",
        productId: newService.id,
      },
      transaction // Asegúrate de pasar la transacción
    );
    await createAssociations(
      Benefit,
      benefits,
      newService.id,
      {
        benefit_type: "service",
        productId: newService.id,
      },
      transaction // Asegúrate de pasar la transacción
    );

    // Crear la duración del servicio
    if (Object.keys(duration).length > 0) {
      await Duration.create(
        { ...duration, serviceId: newService.id },
        { transaction }
      );
    }

    // Crear las recomendaciones asociadas
    await createAssociations(
      Recommendations,
      recommendations,
      newService.id,
      transaction
    );

    // Confirmar transacción
    await transaction.commit();

    // Obtener servicio con todas las asociaciones
    const serviceWithAssociations = await Service.findByPk(newService.id, {
      include: [
        { model: QuestionAnswer, as: "qa" },
        { model: MainTreatment, as: "mainTreatment" },
        { model: Benefit, as: "serviceBenefits" },
        { model: Duration, as: "duration" },
        { model: Recommendations, as: "recommendations" },
      ],
    });

    return res.status(201).json({
      ok: true,
      status: 201,
      data: serviceWithAssociations,
    });
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }
    console.error("Error creating service:", error);
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "Error creating service",
      error: error.message,
    });
  }
};

//--------------------------------------------------------------------------------------------

export const updateService = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { name, slogan, description, mainTreatmentId } = req.body;

    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Service not found",
      });
    }

    // Actualizar el servicio con tratamiento principal
    await service.update(
      {
        name,
        slogan,
        description,
        mainTreatmentId,
      },
      { transaction }
    );

    await transaction.commit();

    res.status(200).json({
      ok: true,
      status: 200,
      data: service,
    });
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }
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
