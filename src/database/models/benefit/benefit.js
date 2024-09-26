import { DataTypes } from "sequelize";
import { sequelize } from "../../index.js";

const Benefit = sequelize.define(
  "Benefit",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "benefit",
  }
);

export default Benefit;
