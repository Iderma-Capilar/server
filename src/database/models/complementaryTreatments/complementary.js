import { DataTypes } from "sequelize";
import { sequelize } from "../../index.js";

const ComplementaryTreatment = sequelize.define(
  "ComplementaryTreatment",
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
  },
  {
    tableName: "complementary_treatment",
  }
);

export default ComplementaryTreatment;
