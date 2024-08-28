import { DataTypes } from "sequelize";
import { sequelize } from "../index.js";

const Doctor = sequelize.define(
  "Doctor",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    specialization: {
      type: DataTypes.STRING(255),
    },
    description: {
      type: DataTypes.STRING,
    },
    cmp: {
		//código de colegiatura
      type: DataTypes.STRING(10),
    },
    rne: {
      //registro nacional de especialidad
      type: DataTypes.STRING(10),
    },
  },
  {
    tableName: "doctor",
  }
);

export default Doctor;
