import { DataTypes } from "sequelize";
import { sequelize } from "../../index.js";

const Technology = sequelize.define(
  "Technology",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    specifications: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    benefits: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    contraindications: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  },
  {
    tableName: "technology",
  }
);

export default Technology;
