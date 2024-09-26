import { DataTypes } from "sequelize";
import { sequelize } from "../../index.js";

const Recommendations = sequelize.define(
  "recommendations",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  { tableName: "recommendations" }
);

export default Recommendations;
