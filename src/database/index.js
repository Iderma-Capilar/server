import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Esto permite conexiones SSL autogeneradas
    },
  },
});

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

export { sequelize, connectToDatabase };
