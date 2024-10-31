"use strict";
const { Model } = require("sequelize");

const questionAnswerOptions = {
  foreignKey: "parentId",
  constraints: false,
  as: "qa",
};

module.exports = (sequelize, DataTypes) => {
  class MainTreatments extends Model {
    static associate(models) {
      MainTreatments.hasMany(models.QuestionsAnswer, {
        ...questionAnswerOptions,
        scope: { parentType: "MainTreatments" },
      });
      MainTreatments.belongsToMany(models.Service, {
        as: "services",
        through: models.ServiceMainTreatment,
        foreignKey: "mainTreatmentId",
        otherKey: "serviceId",
      });
      MainTreatments.hasMany(models.Complementary, {
        foreignKey: "mainTreatmentId",
        as: "complementaryTreatments",
      });
      MainTreatments.hasMany(models.Benefit, {
        foreignKey: "mainTreatmentId",
        as: "benefits",
      });
      MainTreatments.hasMany(models.Recommendations, {
        foreignKey: "mainTreatmentId",
        as: "recommendations",
      });
      MainTreatments.hasMany(models.Duration, {
        foreignKey: "mainTreatmentId",
        as: "durations",
      });
      MainTreatments.hasMany(models.Technology, {
        foreignKey: "mainTreatmentId",
        as: "technologies",
      });
      MainTreatments.hasMany(models.SecondaryEffects, {
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
