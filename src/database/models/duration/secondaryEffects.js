import { DataTypes } from "sequelize";
import { sequelize } from "../../index.js";

const SecondaryEffects = sequelize.define(
  "SecondaryEffects",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "secondary_effects",
  }
);

export default SecondaryEffects;
