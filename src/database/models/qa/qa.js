import { DataTypes } from "sequelize";
import { sequelize } from "../../index.js";

const QuestionAnswer = sequelize.define(
  "ServiceQA",
  {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    parentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "service_qa",
  }
);

export default QuestionAnswer;
