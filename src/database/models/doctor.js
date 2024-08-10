import { DataTypes } from 'sequelize';
import sequelize from '../models/database.js';

const Doctor = sequelize.define(
	'Doctor',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},

		name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		last_name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		url: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		specialization: {
			type: DataTypes.STRING(255)
		},
		description: {
			type: DataTypes.STRING
		},
		cmp: {
			type: DataTypes.STRING(10)
		},
		rne: {
			type: DataTypes.STRING(10)
		}
	},
	{
		tableName: 'doctor',
		timestamps: true
	}
);

export default Doctor;
