import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Slider = sequelize.define('Slider', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    image: {
        type: DataTypes.STRING(255)
    },
    link: {
        type: DataTypes.STRING(255)
    },
    description: {
        type: DataTypes.STRING(255)
    },
    status: {
        type: DataTypes.STRING(255)
    }
}, {
    tableName: 'slider',
    timestamps: false // Desactiva los timestamps si no los necesitas
});

export default Slider;