import { sequelize } from "../database/index.js";
import MainTreatment from "../database/models/mainTreatment/mainTreatment.js";

// CREAR TRATAMIENTO PRINCIPAL
export const createMainTreatment = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { serviceId, type, effectiveness, description, recovery_time } =
      req.body;

    // Validar campos obligatorios
    if (
      !serviceId ||
      !type ||
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

    // Crear el nuevo tratamiento principal
    const newMainTreatment = await MainTreatment.create(
      {
        serviceId,
        type,
        effectiveness,
        description,
        recovery_time,
      },
      { transaction }
    );

    // Confirmar transacción
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
      include: {
        model: Service,
        as: "service", // Cambia esto según el alias que estés usando
      },
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
  const { id } = req.params;

  try {
    const mainTreatment = await MainTreatment.findByPk(id, {
      include: {
        model: Service,
        as: "service", // Cambia esto según el alias que estés usando
      },
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
    const { serviceId, type, effectiveness, description, recovery_time } =
      req.body;

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
        serviceId,
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