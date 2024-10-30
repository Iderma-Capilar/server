import { DataTypes } from "sequelize";
import { sequelize } from "../../index.js";

const Problem = sequelize.define(
  "Problem",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    solution: {
      type: DataTypes.JSON,
    }
  },
  {
    tableName: "problems",
  }
);

export default Problem;
