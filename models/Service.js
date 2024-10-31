"use strict";
const { Model } = require("sequelize");

const questionAnswerOptions = {
  foreignKey: "parentId",
  constraints: false,
  as: "serviceQA",
};
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      Service.hasMany(models.QuestionsAnswer, {
        ...questionAnswerOptions,
        scope: { parentType: "service" },
      });
      Service.belongsToMany(models.MainTreatments, {
        as: "associatedMainTreatments",
        through: models.ServiceMainTreatment,
        foreignKey: "serviceId",
        otherKey: "mainTreatmentId",
      });
      Service.hasMany(models.Benefit, {
        foreignKey: "serviceId",
        as: "benefits",
      });
      Service.hasMany(models.Problem, {
        foreignKey: "serviceId",
        as: "problems",
      });
      Service.hasMany(models.Duration, {
        foreignKey: "serviceId",
        as: "duration",
      });
    }
  }
  Service.init(
    {
      name: DataTypes.STRING,
      slogan: DataTypes.STRING,
      description: DataTypes.TEXT,
      technology: DataTypes.JSON,
      patient_profile: DataTypes.TEXT,
      cta: DataTypes.STRING,
      videos: DataTypes.JSON,
      images: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Service",
      freezeTableName: true,
    }
  );
  return Service;
};
