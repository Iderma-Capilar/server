import { DataTypes } from 'sequelize';
import sequelize from '../models/database.js';
// import Category from './category.js';

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    url: {
        type: DataTypes.STRING(255)
    },
    price: {
        type: DataTypes.FLOAT(5, 2),
        allowNull: true
    },
    description: {
        type: DataTypes.STRING(255)
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Category',
            key: 'id'
        }
    }
}, {
    tableName: 'product',
    timestamps: true // Desactiva los timestamps si no los necesitas
});

// // Establecer la relación
// Product.belongsTo(Category, { foreignKey: 'categoryId' });

export default Product;