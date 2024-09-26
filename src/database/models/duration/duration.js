import { DataTypes } from "sequelize";
import { sequelize } from "../../index.js";

const Duration = sequelize.define(
  "Duration",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    duration_session: {
      type: DataTypes.STRING,
    },
    sessions_quantity: {
      type: DataTypes.INTEGER,
    },
    sessions_interval: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "duration",
  }
);

export default Duration;
