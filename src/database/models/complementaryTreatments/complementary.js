import { DataTypes } from "sequelize";
import { sequelize } from "../../index.js";

const Complementary = sequelize.define(
  "Complementary",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
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
    tableName: "complementary_treatment",
  }
);

export default Complementary;
