"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class QuestionsAnswer extends Model {
    static associate(models) {
      QuestionsAnswer.belongsTo(models.Service, {
        foreignKey: "parentId",
        constraints: false,
        as: "serviceQA",
      });
      QuestionsAnswer.belongsTo(models.Technology, {
        foreignKey: "parentId",
        constraints: false,
        as: "technologyQA",
      });
      QuestionsAnswer.belongsTo(models.MainTreatments, {
        foreignKey: "parentId",
        constraints: false,
        as: "mainTreatmentQA",
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
