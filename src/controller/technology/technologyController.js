const { Technology } = require("../../../models");

// Crear una nueva tecnología
const createTechnology = async (req, res) => {
  try {
    const technology = await Technology.create(req.body);
    res.status(201).json(technology);
  } catch (error) {
    console.error("Error creating technology:", error);
    res.status(500).json({ error: "Failed to create technology" });
  }
};

// Obtener todas las tecnologías
const getAllTechnologies = async (req, res) => {
  try {
    const technologies = await Technology.findAll({
      include: [],
    });
    res.status(200).json(technologies);
  } catch (error) {
    console.error("Error fetching technologies:", error);
    res.status(500).json({ error: "Failed to fetch technologies" });
  }
};

// Obtener una tecnología por ID
const getTechnologyById = async (req, res) => {
  try {
    const { id } = req.params;
    const technology = await Technology.findByPk(id, {
      include: [],
    });
    if (technology) {
      res.status(200).json(technology);
    } else {
      res.status(404).json({ error: "Technology not found" });
    }
  } catch (error) {
    console.error("Error fetching technology:", error);
    res.status(500).json({ error: "Failed to fetch technology" });
  }
};

// Actualizar una tecnología por ID
const updateTechnology = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Technology.update(req.body, {
      where: { id: id },
    });

    if (updated) {
      const updatedTechnology = await Technology.findByPk(id, {
        include: [],
      });
      res.status(200).json(updatedTechnology);
    } else {
      res.status(404).json({ error: "Technology not found" });
    }
  } catch (error) {
    console.error("Error updating technology:", error);
    res.status(500).json({ error: "Failed to update technology" });
  }
};

// Eliminar una tecnología por ID
const deleteTechnology = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Technology.destroy({
      where: { id: id },
    });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Technology not found" });
    }
  } catch (error) {
    console.error("Error deleting technology:", error);
    res.status(500).json({ error: "Failed to delete technology" });
  }
};

module.exports = {
  createTechnology,
  getTechnologyById,
  updateTechnology,
  deleteTechnology,
  getAllTechnologies,
};
