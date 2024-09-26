import { sequelize } from "../database/index.js";
import Benefit from "../database/models/benefit/benefit.js";
import Duration from "../database/models/duration/duration.js";
import SecondaryEffects from "../database/models/duration/secondaryEffects.js";
import MainTreatment from "../database/models/mainTreatment/mainTreatment.js";
import Recommendations from "../database/models/servicios/recommendations.js";

// CREAR TRATAMIENTO PRINCIPAL
export const createMainTreatment = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      type,
      effectiveness,
      description,
      recovery_time,
      benefits = [],
      secondaryEffects = [],
      recommendations = [],
      duration = {},
      postTreatmentCare,
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

    const newMainTreatment = await MainTreatment.create(
      {
        type,
        effectiveness,
        description,
        recovery_time,
        postTreatmentCare
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
    await SecondaryEffects.bulkCreate(
      secondaryEffects.map((effect) => ({
        ...effect,
        mainTreatmentId: newMainTreatment.id,
      })),
      { transaction }
    );

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

    await transaction.commit();

    res.status(201).json({
      ok: true,
      status: 201,
      data: newMainTreatment,
    });
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error creating main treatment",
      error: error.message,
    });
  }
};

// OBTENER TODOS LOS TRATAMIENTOS PRINCIPALES
export const getAllMainTreatments = async (req, res) => {
  try {
    const mainTreatments = await MainTreatment.findAll({
      include: [
        { model: Benefit, as: "benefits" },
        { model: SecondaryEffects, as: "secondaryEffects" },
        { model: Recommendations, as: "recommendations" },
        { model: Duration, as: "durations" },
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
export const getMainTreatmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const mainTreatment = await MainTreatment.findByPk(id, {
      include: [
        { model: Benefit, as: "benefits" },
        { model: SecondaryEffects, as: "secondaryEffects" },
        { model: Recommendations, as: "recommendations" },
        { model: Duration, as: "durations" },
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
export const updateMainTreatment = async (req, res) => {
  const { id } = req.params;

  const transaction = await sequelize.transaction();
  try {
    const { type, effectiveness, description, recovery_time } = req.body;

    const mainTreatment = await MainTreatment.findByPk(id);

    if (!mainTreatment) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Main treatment not found",
      });
    }

    // Actualizar los campos
    await mainTreatment.update(
      {
        type,
        effectiveness,
        description,
        recovery_time,
      },
      { transaction }
    );

    // Confirmar transacción
    await transaction.commit();

    res.status(200).json({
      ok: true,
      status: 200,
      data: mainTreatment,
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
export const deleteMainTreatment = async (req, res) => {
  const { id } = req.params;

  const transaction = await sequelize.transaction();
  try {
    const mainTreatment = await MainTreatment.findByPk(id);

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
