"use strict";
const { Model } = require("sequelize");
const Questionsanswer = require("./Questionsanswer");
const Servicemaintreatment = require("./Servicemaintreatment");
const Benefit = require("./Benefit");
const Problem = require("./Problem");
const Duration = require("./Duration");
const MainTreatments = require("./MainTreatments");

const questionAnswerOptions = {
  foreignKey: "parentId",
  constraints: false,
  as: "qa",
};
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Service.hasMany(Questionsanswer, {
        ...questionAnswerOptions,
        scope: { parentType: "service" },
      });
      Service.belongsToMany(MainTreatments, {
        as: "associatedMainTreatments",
        through: Servicemaintreatment,
        foreignKey: "serviceId",
        otherKey: "mainTreatmentId",
      });
      Service.hasMany(Benefit, {
        foreignKey: "serviceId",
        as: "benefits",
      });
      Service.hasMany(Problem, {
        foreignKey: "serviceId",
        as: "problems",
      });
      Service.hasMany(Duration, {
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
    }
  );
  return Service;
};
