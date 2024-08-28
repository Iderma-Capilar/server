import { DataTypes } from "sequelize";
import { sequelize } from "../index.js";

const Technology = sequelize.define(
  "Technology",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    thumbnail: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    original: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    machineType: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    procedures: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    recommendations: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "technology",
    timestamps: false,
  }
);

export default Technology;
