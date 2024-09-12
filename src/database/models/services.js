import { DataTypes } from "sequelize";
import { sequelize } from "../index.js";

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
    image: {
      type: DataTypes.STRING(255),
    },
    miniature: {
      type: DataTypes.STRING(255),
    },
    description: {
      type: DataTypes.STRING(255),
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
