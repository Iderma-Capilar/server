"use strict";
const { Model } = require("sequelize");
const Questionsanswer = require("./Questionsanswer");
const Service = require("./Service");
const Servicemaintreatment = require("./Servicemaintreatment");
const Complementary = require("./Complementary");
const Benefit = require("./Benefit");
const Recommendations = require("./Recommendations");
const Duration = require("./Duration");
const Technology = require("./Technology");
const Secondaryeffects = require("./Secondaryeffects");

const questionAnswerOptions = {
  foreignKey: "parentId",
  constraints: false,
  as: "qa",
};
module.exports = (sequelize, DataTypes) => {
  class MainTreatments extends Model {
    static associate(models) {
      MainTreatments.hasMany(Questionsanswer, {
        ...questionAnswerOptions,
        scope: { parentType: "MainTreatments" },
      });
      MainTreatments.belongsToMany(Service, {
        as: "services",
        through: Servicemaintreatment,
        foreignKey: "mainTreatmentId",
        otherKey: "serviceId",
      });
      MainTreatments.hasMany(Complementary, {
        foreignKey: "mainTreatmentId",
        as: "complementaryTreatments",
      });
      MainTreatments.hasMany(Benefit, {
        foreignKey: "mainTreatmentId",
        as: "benefits",
      });
      MainTreatments.hasMany(Recommendations, {
        foreignKey: "mainTreatmentId",
        as: "recommendations",
      });
      MainTreatments.hasMany(Duration, {
        foreignKey: "mainTreatmentId",
        as: "durations",
      });
      MainTreatments.hasMany(Technology, {
        foreignKey: "mainTreatmentId",
        as: "technologies",
      });
      MainTreatments.hasMany(Secondaryeffects, {
        foreignKey: "mainTreatmentId",
        as: "secondaryEffects",
      });
    }
  }
  MainTreatments.init(
    {
      type: DataTypes.STRING,
      effectiveness: DataTypes.STRING,
      description: DataTypes.TEXT,
      recovery_time: DataTypes.STRING,
      post_treatment_care: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MainTreatments",
    }
  );
  return MainTreatments;
};
