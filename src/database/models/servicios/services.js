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
    main_treatment: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    secondary_treatment: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    duration: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    recommendations: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    qa: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "service",
  }
);

export default Service;
