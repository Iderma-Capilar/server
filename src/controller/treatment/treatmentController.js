const Benefit = require("../../../models/Benefit");
const Complementary = require("../../../models/Complementary");
const Duration = require("../../../models/Duration");
const MainTreatments = require("../../../models/MainTreatments");
const Recommendations = require("../../../models/Recommendations");
const Secondaryeffects = require("../../../models/Secondaryeffects");

// CREAR TRATAMIENTO PRINCIPAL
const createMainTreatment = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      type,
      effectiveness,
      description,
      recovery_time,
      postTreatmentCare,
      benefits = [],
      secondaryEffects = [],
      recommendations = [],
      duration = {},
      complementary = [],
    } = req.body;

    if (
      !type ||
      !postTreatmentCare ||
      !effectiveness ||
      !description ||
      !recovery_time
    ) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "All fields are required.",
      });
    }

    const newMainTreatment = await MainTreatments.create(
      {
        type,
        effectiveness,
        description,
        recovery_time,
        post_treatment_care: postTreatmentCare,
      },
      { transaction }
    );

    // Asignar beneficios
    await Benefit.bulkCreate(
      benefits.map((benefit) => ({
        ...benefit,
        mainTreatmentId: newMainTreatment.id,
      })),
      { transaction }
    );

    // Asignar efectos secundarios
    if (secondaryEffects.length > 0) {
      await Secondaryeffects.bulkCreate(
        secondaryEffects.map((effect) => ({
          ...effect,
          mainTreatmentId: newMainTreatment.id,
        })),
        { transaction }
      );
    }

    // Agregar complementarios
    if (complementary.length > 0) {
      await Complementary.bulkCreate(
        complementary.map((treatment) => ({
          ...treatment,
          mainTreatmentId: newMainTreatment.id,
        })),
        { transaction }
      );
    }

    // Asignar recomendaciones
    await Recommendations.bulkCreate(
      recommendations.map((rec) => ({
        ...rec,
        mainTreatmentId: newMainTreatment.id,
      })),
      { transaction }
    );

    // Asignar duración
    if (Object.keys(duration).length > 0) {
      await Duration.create(
        { ...duration, mainTreatmentId: newMainTreatment.id },
        { transaction }
      );
    }

    // Confirmar la transacción
    await transaction.commit();

    // Obtener el tratamiento completo con todas sus relaciones
    const createdTreatment = await Maintreatment.findByPk(newMainTreatment.id, {
      include: [
        { model: Benefit, as: "benefits" },
        { model: Secondaryeffects, as: "secondaryEffects" },
        { model: Recommendations, as: "recommendations" },
        { model: Duration, as: "durations" },
        { model: Complementary, as: "complementaryTreatments" },
      ],
    });

    res.status(201).json({
      ok: true,
      status: 201,
      data: createdTreatment,
    });
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error creating main treatment",
      error: error,
    });
  }
};

// OBTENER TODOS LOS TRATAMIENTOS PRINCIPALES
const getAllMainTreatments = async (req, res) => {
  try {
    const mainTreatments = await MainTreatments.findAll({
      include: [
        { model: Benefit, as: "benefits" },
        { model: Secondaryeffects, as: "secondaryEffects" },
        { model: Recommendations, as: "recommendations" },
        { model: Duration, as: "durations" },
        { model: Complementary, as: "complementaryTreatments" },
      ],
    });

    res.status(200).json({
      ok: true,
      status: 200,
      data: mainTreatments,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error fetching main treatments",
      error: error.message,
    });
  }
};

// OBTENER UN TRATAMIENTO PRINCIPAL POR ID
const getMainTreatmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const mainTreatment = await MainTreatments.findByPk(id, {
      include: [
        { model: Benefit, as: "benefits" },
        { model: Secondaryeffects, as: "secondaryEffects" },
        { model: Recommendations, as: "recommendations" },
        { model: Duration, as: "durations" },
        { model: Complementary, as: "complementaryTreatments" },
      ],
    });

    if (!mainTreatment) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Main treatment not found",
      });
    }

    res.status(200).json({
      ok: true,
      status: 200,
      data: mainTreatment,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error fetching main treatment",
      error: error.message,
    });
  }
};

// ACTUALIZAR TRATAMIENTO PRINCIPAL
const updateMainTreatment = async (req, res) => {
  const { id } = req.params;

  const transaction = await sequelize.transaction();
  try {
    const {
      type,
      effectiveness,
      description,
      recovery_time,
      postTreatmentCare,
      secondaryEffects = [],
      complementary = [],
    } = req.body;

    const mainTreatment = await MainTreatments.findByPk(id);

    if (!mainTreatment) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Main treatment not found",
      });
    }

    // Crear un objeto para los campos actualizados
    const updatedFields = {};

    // Actualizar los campos del tratamiento principal y registrar cambios
    if (type) {
      updatedFields.type = type;
      mainTreatment.type = type;
    }
    if (effectiveness) {
      updatedFields.effectiveness = effectiveness;
      mainTreatment.effectiveness = effectiveness;
    }
    if (description) {
      updatedFields.description = description;
      mainTreatment.description = description;
    }
    if (recovery_time) {
      updatedFields.recovery_time = recovery_time;
      mainTreatment.recovery_time = recovery_time;
    }
    if (postTreatmentCare) {
      updatedFields.post_treatment_care = postTreatmentCare;
      mainTreatment.post_treatment_care = postTreatmentCare;
    }

    // Guardar cambios en la base de datos
    await mainTreatment.save({ transaction });

    // Actualizar los efectos secundarios
    if (secondaryEffects.length > 0) {
      // Eliminar los efectos secundarios existentes
      await Secondaryeffects.destroy({
        where: { mainTreatmentId: id },
        transaction,
      });

      // Crear los nuevos efectos secundarios
      await secondaryEffects.bulkCreate(
        secondaryEffects.map((effect) => ({
          ...effect,
          mainTreatmentId: id,
        })),
        { transaction }
      );

      // Agregar efectos secundarios a los campos actualizados
      updatedFields.secondaryEffects = secondaryEffects;
    }

    // Actualizar los tratamientos complementarios
    if (complementary.length > 0) {
      // Eliminar los tratamientos complementarios existentes
      await Complementary.destroy({
        where: { mainTreatmentId: id },
        transaction,
      });

      // Crear los nuevos tratamientos complementarios
      await Complementary.bulkCreate(
        complementary.map((treatment) => ({
          ...treatment,
          mainTreatmentId: id,
        })),
        { transaction }
      );

      // Agregar tratamientos complementarios a los campos actualizados
      updatedFields.complementary = complementary;
    }

    // Confirmar la transacción
    await transaction.commit();

    res.status(200).json({
      ok: true,
      status: 200,
      data: updatedFields,
    });
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error updating main treatment",
      error: error.message,
    });
  }
};

// ELIMINAR TRATAMIENTO PRINCIPAL
const deleteMainTreatment = async (req, res) => {
  const { id } = req.params;

  const transaction = await sequelize.transaction();
  try {
    const mainTreatment = await MainTreatments.findByPk(id);

    if (!mainTreatment) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Main treatment not found",
      });
    }

    // Eliminar el tratamiento
    await mainTreatment.destroy({ transaction });

    // Confirmar transacción
    await transaction.commit();

    res.status(200).json({
      ok: true,
      status: 200,
      message: "Main treatment deleted successfully",
    });
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error deleting main treatment",
      error: error.message,
    });
  }
};

module.exports = {
  createMainTreatment,
  getAllMainTreatments,
  getMainTreatmentById,
  updateMainTreatment,
  deleteMainTreatment,
};
