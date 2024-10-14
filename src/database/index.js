import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "mysql",
  logging: console.log,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database");
    // await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await sequelize.sync({ alert: true });
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
