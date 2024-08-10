// En models/category.js
import { DataTypes } from 'sequelize';
import sequelize from '../models/database.js';
// import Product from './product.js';

const Category = sequelize.define(
	'Category',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING(150),
			allowNull: false
		},
		description: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		imageUrl: {
			type: DataTypes.STRING(255),
			allowNull: false
		}
	},
	{
		tableName: 'category'
	}
);

// Category.hasMany(Product, { foreignKey: 'categoryId' });

export default Category;
