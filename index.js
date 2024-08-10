import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
const { PORT } = process.env;
import routes from './src/routes/index.js';
import connectionToDataBase from './src/database/index.js';
import sequelize from '../server-iderma/src/database/models/database.js'
import './src/database/models/associations.js'; 
dotenv.config();

const app = express();
const server = createServer(app);

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

app.use('/', routes);

app.get('/', (_req, res) => res.status(200).send('Server running'));



// Sincronizar modelos con la base de datos
const syncModels = async () => {
    try {
          // 'force: true' elimina las tablas existentes y las vuelve a crear
        console.log('Modelos sincronizados con la base de datos');
    } catch (error) {
        console.error('Error sincronizando los modelos con la base de datos:', error);
    }
};


connectionToDataBase()
	.then(() => {
		server.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.error('Error connecting to database:', error);
	});
