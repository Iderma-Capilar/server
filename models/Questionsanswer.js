"use strict";
const { Model } = require("sequelize");
const Service = require("./Service");
const Technology = require("./Technology");
const Maintreatment = require("./MainTreatments");

module.exports = (sequelize, DataTypes) => {
  class QuestionsAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      QuestionsAnswer.belongsTo(Service, {
        foreignKey: "parentId",
        constraints: false,
      });
      QuestionsAnswer.belongsTo(Technology, {
        foreignKey: "parentId",
        constraints: false,
      });
      QuestionsAnswer.belongsTo(Maintreatment, {
        foreignKey: "parentId",
        constraints: false,
      });
    }
  }
  QuestionsAnswer.init(
    {
      question: DataTypes.STRING,
      answer: DataTypes.TEXT,
      parentId: DataTypes.INTEGER,
      parentType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "QuestionsAnswer",
    }
  );
  return QuestionsAnswer;
};
