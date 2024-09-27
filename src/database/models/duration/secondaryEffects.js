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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    mainTreatmentId: {
      type: DataTypes.INTEGER,
      references: {
        model: "MainTreatment",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "secondary_effects",
  }
);

export default SecondaryEffects;
