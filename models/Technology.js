"use strict";
const { Model } = require("sequelize");
const Questionsanswer = require("./Questionsanswer");

const questionAnswerOptions = {
  foreignKey: "parentId",
  constraints: false,
  as: "qa",
};
module.exports = (sequelize, DataTypes) => {
  class Technology extends Model {
    static associate(models) {
      Technology.hasMany(Questionsanswer, {
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
    }
  );
  return Technology;
};
