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
    technology: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    patient_profile: {
      type: DataTypes.TEXT,
    },
    cta: {
      type: DataTypes.STRING,
    },
    videos: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
  },
  {
    tableName: "service",
  }
);

export default Service;
