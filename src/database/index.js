import dotenv from 'dotenv';
dotenv.config();
import sequelize from './models/database.js';
import mysql from 'mysql2';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const connection = mysql.createConnection({
	host: DB_HOST,
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME
});

const connectToDatabase = async () => {
	try {
		await new Promise((resolve, reject) => {
			connection.connect((err) => {
				if (err) {
					reject(err);
				} else {
					console.log('Connected to database');
					resolve();
				}
			});
		});

		// Si necesitas sincronizar Sequelize después de la conexión
		await sequelize.sync({ alter: true });
	} catch (err) {
		// Maneja el error aquí
		console.error('Error connecting to the database:', err);
		throw err; // Re-lanza el error si quieres que se maneje en otro lugar
	}
};

export default connectToDatabase;
