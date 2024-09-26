import { DataTypes } from "sequelize";
import { sequelize } from "../../index.js";

const MainTreatment = sequelize.define(
  "MainTreatment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    effectiveness: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    recovery_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_treatment_care: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "maintreatment",
  }
);

export default MainTreatment;
