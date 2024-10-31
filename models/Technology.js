"use strict";
const { Model } = require("sequelize");

const questionAnswerOptions = {
  foreignKey: "parentId",
  constraints: false,
  as: "technologyQA",
};
module.exports = (sequelize, DataTypes) => {
  class Technology extends Model {
    static associate(models) {
      Technology.hasMany(models.QuestionsAnswer, {
        ...questionAnswerOptions,
        scope: { parentType: "technology" },
      });
    }
  }
  Technology.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      specifications: DataTypes.TEXT,
      benefits: DataTypes.TEXT,
      contraindications: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Technology",
      freezeTableName: true,
    }
  );
  return Technology;
};
