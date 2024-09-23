import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const { DATABASE_URL } = process.env;

// ENTORNO DE PRODUCCION
// -----------------------------------

// const sequelize = new Sequelize(DATABASE_URL, {
//   dialect: "postgres",
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });

// ENTORNO DE LOCAL DE DESARROLLO
// -----------------------------------

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database");
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err;
  }
};

export { sequelize, connectToDatabase };
