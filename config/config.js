const dotenv = require("dotenv");
dotenv.config();

const {
  MYSQL_DB_LOCAL_USER,
  MYSQL_DB_LOCAL_PASSWORD,
  MYSQL_DB_LOCAL_HOST,
  MYSQL_DB_LOCAL_NAME,
  MYSQL_DB_PROD_USER,
  MYSQL_DB_PROD_NAME,
  MYSQL_DB_PROD_HOST,
  MYSQL_DB_PROD_PASSWORD,
  MYSQL_DB_PROD_PORT,
  MYSQL_DB_LOCAL_PORT,
} = process.env;

const config = {
  development: {
    username: MYSQL_DB_LOCAL_USER,
    password: MYSQL_DB_LOCAL_PASSWORD,
    database: MYSQL_DB_LOCAL_NAME,
    host: MYSQL_DB_LOCAL_HOST,
    port: MYSQL_DB_LOCAL_PORT,
    dialect: "mysql",
  },
  test: {
    username: MYSQL_DB_PROD_USER,
    password: MYSQL_DB_PROD_PASSWORD,
    database: MYSQL_DB_PROD_NAME,
    host: MYSQL_DB_PROD_HOST,
    port: MYSQL_DB_PROD_PORT,
    dialect: "mysql",
  },
  production: {
    username: MYSQL_DB_LOCAL_USER,
    password: MYSQL_DB_LOCAL_PASSWORD,
    database: MYSQL_DB_LOCAL_NAME,
    host: MYSQL_DB_LOCAL_HOST,
    dialect: "mysql",
  },
};

module.exports = config;
