import { sequelize } from "../database/index.js";
import QuestionAnswer from "../database/models/qa/qa.js";
import MainTreatment from "../database/models/mainTreatment/mainTreatment.js";
import Service from "../database/models/servicios/services.js";
import ServiceMainTreatment from "../database/models/intermediate/serviceMainTreatment.js";

//--------------------------------------------------------------------------------------------
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      include: [
        { model: QuestionAnswer, as: "qa" }, // Alias para preguntas y respuestas
        { model: MainTreatment, as: "mainTreatment" }, // Tratamiento principal
        { model: MainTreatment, as: "associatedMainTreatments" }, // Tratamientos asociados
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
        { model: QuestionAnswer, as: "qa" }, // Alias para preguntas y respuestas
        { model: MainTreatment, as: "mainTreatment" }, // Tratamiento principal
        { model: MainTreatment, as: "associatedMainTreatments" }, // Tratamientos asociados
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
      mainTreatmentId,
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
        mainTreatmentId,
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

    // Confirmar transacción
    await transaction.commit();

    // Obtener el servicio con las asociaciones
    const serviceWithAssociations = await Service.findByPk(newService.id, {
      include: [
        { model: QuestionAnswer, as: "qa" },
        { model: MainTreatment, as: "mainTreatment" },
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
    const { name, slogan, description, mainTreatmentIds = [] } = req.body;

    const service = await Service.findByPk(id, {
      include: [
        { model: MainTreatment, as: "mainTreatment" },
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

    // Actualizar los campos del servicio
    await service.update(
      {
        name,
        slogan,
        description,
      },
      { transaction }
    );

    // Eliminar tratamientos no incluidos en la nueva lista
    await sequelize.query(
      "DELETE FROM ServiceMainTreatment WHERE serviceId = :serviceId AND mainTreatmentId NOT IN (:mainTreatmentIds)",
      {
        replacements: {
          serviceId: service.id,
          mainTreatmentIds: mainTreatmentIds.length ? mainTreatmentIds : [null], // Para manejar el caso donde el array está vacío
        },
        transaction,
      }
    );

    // Agregar nuevos tratamientos
    if (mainTreatmentIds.length > 0) {
      const newTreatments = mainTreatmentIds.map((treatmentId) => ({
        serviceId: service.id,
        mainTreatmentId: treatmentId,
      }));

      await ServiceMainTreatment.bulkCreate(newTreatments, {
        ignoreDuplicates: true,
        transaction,
      });
    }

    await transaction.commit();

    const updatedService = await Service.findByPk(id, {
      include: [
        { model: MainTreatment, as: "mainTreatment" },
        { model: MainTreatment, as: "associatedMainTreatments" },
      ],
    });

    res.status(200).json({
      ok: true,
      status: 200,
      data: updatedService,
    });
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }
    console.error(error); // Agregar un log para depuración
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
