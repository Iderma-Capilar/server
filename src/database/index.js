import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const { POSTGRES_DB_USER, POSTGRES_DB_NAME, POSTGRES_DB_HOST,
   POSTGRES_DB_PASSWORD, POSTGRES_DB_DOCKER_PORT } = process.env;

const sequelize = new Sequelize({
  host: POSTGRES_DB_HOST,
  dialect: "postgres",
  logging: false,
  port: parseInt(POSTGRES_DB_DOCKER_PORT, 10),
  username: POSTGRES_DB_USER,
  password: POSTGRES_DB_PASSWORD,
  database: POSTGRES_DB_NAME,
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
