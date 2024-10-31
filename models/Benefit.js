"use strict";
const { Model } = require("sequelize");
const Maintreatment = require("./MainTreatments");
const Service = require("./Service");
module.exports = (sequelize, DataTypes) => {
  class Benefit extends Model {
    static associate(models) {
      Benefit.belongsTo(Maintreatment, {
        foreignKey: "mainTreatmentId",
        as: "mainTreatment",
      });
      Benefit.belongsTo(Service, {
        foreignKey: "serviceId",
        as: "service",
      });
    }
  }
  Benefit.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Benefit",
    }
  );
  return Benefit;
};
