import { DataTypes } from "sequelize";
import { sequelize } from "../../index.js";
import Service from "./services.js";


const MainTreatment = sequelize.define(
  "MainTreatment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      references: {
        model: Service,
        key: "id",
      },
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "main_treatment",
  }
);

export default MainTreatment;
