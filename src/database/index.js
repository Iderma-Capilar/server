import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const { DB_USER, DB_NAME, DB_HOST, DB_PASSWORD, DB_DOCKER_PORT } = process.env;

const sequelize = new Sequelize({
  host: DB_HOST,
  dialect: "postgres",
  logging: false,
  port: parseInt(DB_DOCKER_PORT, 10),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err;
  }
};

export { sequelize, connectToDatabase };
