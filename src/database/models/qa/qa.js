import { DataTypes } from "sequelize";
import { sequelize } from "../../index.js";

const QuestionAnswer = sequelize.define(
  "ServiceQA",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    qaType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "service_qa",
  }
);

export default QuestionAnswer;
