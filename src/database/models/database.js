import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

// Crear una instancia de Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD,{
    host: DB_HOST,
    dialect: 'mysql',
    port: parseInt(DB_PORT, 10)// Puedes cambiar esto a true si deseas ver los logs de las consultas SQL
});



export default sequelize;