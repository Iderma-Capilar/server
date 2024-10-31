const config = require("../../config/config");
const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

dotenv.config();

const environment = process.env.NODE_ENV || "development";
const dbConfig = config[environment];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: (msg) => console.log(msg),
  }
);

module.exports = {
  sequelize,
  Sequelize,
};
