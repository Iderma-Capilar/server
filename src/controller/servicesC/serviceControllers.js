const { sequelize } = require("../../utils/index.js");

const {
  Questionsanswer,
  Service,
  Servicemaintreatment,
  Secondaryeffects,
  Recommendations,
  Duration,
  Complementary,
  Problem,
  Benefit,
  MainTreatments,
} = require("../../../models");

//--------------------------------------------------------------------------------------------
const getAllServices = async (_req, res) => {
  try {
    const services = await Service.findAll({
      include: [
        { model: Questionsanswer, as: "serviceQA" },
        { model: Problem, as: "problems" },
        { model: Benefit, as: "benefits" },
        {
          model: MainTreatments,
          as: "associatedMainTreatments",
          include: [
            { model: Benefit, as: "benefits" },
            { model: Secondaryeffects, as: "secondaryEffects" },
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

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id, {
      include: [
        { model: Questionsanswer, as: "serviceQA" },
        { model: MainTreatments, as: "associatedMainTreatments" },
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
const createService = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      name,
      slogan,
      description,
      technology = {},
      problem = [],
      // duration = {},
      patient_profile,
      questions = [],
      benefits = [],
      mainTreatmentIds = [],
      videos = [],
      images = [],
      cta,
    } = req.body;

    if (!name || !description) {
      await transaction.rollback();
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Name and description are required.",
      });
    }

    // Crear el servicio
    const newService = await Service.create(
      {
        name,
        slogan,
        description,
        technology,
        patient_profile,
        videos,
        images,
        cta,
      },
      { transaction }
    );

    // Crear preguntas y respuestas asociadas
    if (questions.length > 0) {
      const qaRecords = questions.map((q) => ({
        question: q.question,
        answer: q.answer,
        parentId: newService.id,
        parentType: "service",
      }));
      await Questionsanswer.bulkCreate(qaRecords, { transaction });
    }

    // Asignar beneficios
    if (benefits.length > 0) {
      await Benefit.bulkCreate(
        benefits.map((benefit) => ({
          ...benefit,
          serviceId: newService.id,
        })),
        { transaction }
      );
    }

    // Crear problemas y soluciones asociadas
    if (problem.length > 0) {
      const problemRecords = problem.map((p) => ({
        description: p.description,
        solution: p.solution,
        serviceId: newService.id,
      }));
      await Problem.bulkCreate(problemRecords, { transaction });
    }

    // Asignar duración
    // if (Object.keys(duration).length > 0) {
    //   await Duration.create(
    //     { ...duration, serviceId: newService.id },
    //     { transaction }
    //   );
    // }

    // Crear asociaciones con tratamientos principales (varios)
    if (mainTreatmentIds.length > 0) {
      const treatmentAssociations = mainTreatmentIds.map((treatmentId) => ({
        serviceId: newService.id,
        mainTreatmentId: treatmentId,
      }));
      await Servicemaintreatment.bulkCreate(treatmentAssociations, {
        transaction,
      });
    }

    // Confirmar transacción
    await transaction.commit();

    // Obtener el servicio con todas las asociaciones
    const serviceWithAssociations = await Service.findByPk(newService.id, {
      include: [
        { model: Questionsanswer, as: "serviceQA" },
        { model: Benefit, as: "benefits" },
        { model: Problem, as: "problems" },
        { model: Duration, as: "duration" },
        { model: MainTreatments, as: "associatedMainTreatments" },
      ],
    });

    return res.status(201).json({
      ok: true,
      status: 201,
      data: serviceWithAssociations,
    });
  } catch (error) {
    if (transaction.finished !== "commit") {
      await transaction.rollback();
    }
    console.error("Error creating service:", error);

    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error creating service",
      error: error.message,
    });
  }
};

//--------------------------------------------------------------------------------------------

const updateService = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const {
      name,
      slogan,
      description,
      mainTreatmentIds = [],
      videos,
      images,
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

    // Crear un objeto con los campos a actualizar
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (slogan) updatedFields.slogan = slogan;
    if (description) updatedFields.description = description;
    if (videos !== undefined) updatedFields.videos = videos;
    if (images !== undefined) updatedFields.images = images;

    // Actualizar los datos básicos del servicio
    await service.update(updatedFields, { transaction });

    // Actualizar preguntas y respuestas
    if (questions.length > 0) {
      await Questionsanswer.destroy({ where: { productId: id }, transaction });
      const qaRecords = questions.map((q) => ({
        question: q.question,
        answer: q.answer,
        productId: id,
      }));

      await Questionsanswer.bulkCreate(qaRecords, { transaction });
    }

    // Actualizar tratamientos principales asociados
    if (mainTreatmentIds.length > 0) {
      await Servicemaintreatment.destroy({
        where: { serviceId: id },
        transaction,
      });

      const treatmentAssociations = mainTreatmentIds.map((treatmentId) => ({
        serviceId: id,
        mainTreatmentId: treatmentId,
      }));

      await Servicemaintreatment.bulkCreate(treatmentAssociations, {
        transaction,
      });
    }

    // Confirmar transacción
    await transaction.commit();

    // Obtener los tratamientos asociados actualizados
    const updatedService = await Service.findByPk(id, {
      include: [
        {
          model: MainTreatments,
          as: "associatedMainTreatments",
          required: false,
        },
      ],
    });

    // Construir la respuesta con los datos del servicio actualizado
    const responseData = {
      id: updatedService.id,
      mainTreatmentIds:
        mainTreatmentIds.length > 0 ? mainTreatmentIds : undefined,
      associatedMainTreatments: updatedService.associatedMainTreatments,
    };

    return res.status(200).json({
      ok: true,
      status: 200,
      data: responseData,
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

const deleteService = async (req, res) => {
  const transaction = await sequelize.transaction();
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

    await Questionsanswer.destroy({ where: { productId: id }, transaction });

    // Si tienes otras tablas relacionadas, también deberías eliminarlas aquí
    await Servicemaintreatment.destroy({
      where: { serviceId: id },
      transaction,
    });

    // Luego, eliminar el servicio
    await service.destroy({ transaction });

    // Confirmar transacción
    await transaction.commit();

    res.status(200).json({
      ok: true,
      status: 200,
      message: "Service deleted successfully",
    });
  } catch (error) {
    if (transaction.finished) {
      await transaction.rollback();
    }
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error deleting service",
      error: error.message,
    });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
