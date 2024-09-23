import { DataTypes } from "sequelize";
import { sequelize } from "../../index.js";

const Service = sequelize.define(
  "Service",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    slogan: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    duration: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    recommendations: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: "service",
  }
);

export default Service;
