import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import config from "../../config/config.js";
dotenv.config();

const enviroment = process.env.NODE_ENV || "development";
const dbConfig = config[enviroment];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database");
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err;
  }
};

const createAssociations = async (
  Model,
  items,
  serviceId,
  additionalData = {},
  transaction
) => {
  if (!items || items.length === 0) return;

  const dataToCreate = items.map((item) => ({
    ...item,
    serviceId,
    ...additionalData,
  }));

  try {
    await Model.bulkCreate(dataToCreate, { transaction });
  } catch (error) {
    console.error("Error creating associations:", error);
    throw error;
  }
};

export { sequelize, connectToDatabase, createAssociations };
