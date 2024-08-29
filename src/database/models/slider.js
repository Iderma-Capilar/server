import { DataTypes } from "sequelize";
import { sequelize } from "../index.js";

const Slider = sequelize.define(
  "Slider",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title_1: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    description_1:{
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    img_center: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    btn_link: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    title_2: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    description_2:{
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "slider",
  }
);

export default Slider;
