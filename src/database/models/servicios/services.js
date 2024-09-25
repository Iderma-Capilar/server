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
    mainTreatmentId: {
      type: DataTypes.INTEGER,
      references: {
        model: "maintreatment",
        key: "id",
      },
    },
  },
  {
    tableName: "service",
  }
);

export default Service;
