import { sequelize } from "../database/index.js";
import QuestionAnswer from "../database/models/qa/qa.js";
import MainTreatment from "../database/models/mainTreatment/mainTreatment.js";
import Service from "../database/models/servicios/services.js";
import ServiceMainTreatment from "../database/models/intermediate/serviceMainTreatment.js";
import Benefit from "../database/models/benefit/benefit.js";
import SecondaryEffects from "../database/models/duration/secondaryEffects.js";
import Recommendations from "../database/models/servicios/recommendations.js";
import Duration from "../database/models/duration/duration.js";
import Complementary from "../database/models/complementaryTreatments/complementary.js";

//--------------------------------------------------------------------------------------------
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      include: [
        { model: QuestionAnswer, as: "qa" },
        {
          model: MainTreatment,
          as: "associatedMainTreatments",
          include: [
            { model: Benefit, as: "benefits" },
            { model: SecondaryEffects, as: "secondaryEffects" },
            { model: Recommendations, as: "recommendations" },
            { model: Duration, as: "durations" },
            { model: Complementary, as: "complementaryTreatments" },
          ],
        },
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
        { model: MainTreatment, as: "associatedMainTreatments" },
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
      mainTreatmentIds = [], // Array de IDs de tratamientos
      videos = [],
      images = [],
      questions = [],
    } = req.body;

    // Validación básica
    if (!name || !description) {
      await transaction.rollback();
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Name and description are required.",
      });
    }

    // Crear el nuevo servicio con todos los campos
    const newService = await Service.create(
      {
        name,
        slogan,
        description,
        videos,
        images,
      },
      { transaction }
    );

    // Crear preguntas y respuestas asociadas
    if (questions.length > 0) {
      const qaRecords = questions.map((q) => ({
        question: q.question,
        answer: q.answer,
        productId: newService.id,
      }));

      await QuestionAnswer.bulkCreate(qaRecords, { transaction });
    }

    // Crear asociaciones con tratamientos principales (varios)
    if (mainTreatmentIds.length > 0) {
      const treatmentAssociations = mainTreatmentIds.map((treatmentId) => ({
        serviceId: newService.id,
        mainTreatmentId: treatmentId,
      }));

      await ServiceMainTreatment.bulkCreate(treatmentAssociations, {
        transaction,
      });
    }

    // Confirmar transacción
    await transaction.commit();

    // Obtener el servicio con las asociaciones
    const serviceWithAssociations = await Service.findByPk(newService.id, {
      include: [
        { model: QuestionAnswer, as: "qa" },
        { model: MainTreatment, as: "associatedMainTreatments" },
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
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const {
      name,
      slogan,
      description,
      mainTreatmentIds = [],
      videos = [],
      images = [],
      questions = [],
    } = req.body;

    // Verificar que el servicio exista
    const service = await Service.findByPk(id);
    if (!service) {
      await transaction.rollback();
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Service not found.",
      });
    }

    // Actualizar los datos básicos del servicio
    await service.update(
      {
        name,
        slogan,
        description,
        videos,
        images,
      },
      { transaction }
    );

    // Actualizar preguntas y respuestas
    if (questions.length > 0) {
      // Primero, eliminamos las QA existentes
      await QuestionAnswer.destroy({ where: { productId: id }, transaction });

      // Luego, añadimos las nuevas QA
      const qaRecords = questions.map((q) => ({
        question: q.question,
        answer: q.answer,
        productId: id,
      }));

      await QuestionAnswer.bulkCreate(qaRecords, { transaction });
    }

    // Actualizar tratamientos principales asociados
    if (mainTreatmentIds.length > 0) {
      // Primero, eliminar asociaciones existentes en la tabla intermedia
      await ServiceMainTreatment.destroy({
        where: { serviceId: id },
        transaction,
      });

      // Luego, crear nuevas asociaciones
      const treatmentAssociations = mainTreatmentIds.map((treatmentId) => ({
        serviceId: id,
        mainTreatmentId: treatmentId,
      }));

      await ServiceMainTreatment.bulkCreate(treatmentAssociations, {
        transaction,
      });
    }

    // Confirmar transacción
    await transaction.commit();

    // Obtener el servicio actualizado con sus asociaciones
    const updatedService = await Service.findByPk(id, {
      include: [
        { model: QuestionAnswer, as: "qa" },
        { model: MainTreatment, as: "associatedMainTreatments" },
      ],
    });

    return res.status(200).json({
      ok: true,
      status: 200,
      data: updatedService,
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
