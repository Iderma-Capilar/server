"use strict";
const { Model } = require("sequelize");
const Maintreatment = require("./MainTreatments");
const Service = require("./Service");
module.exports = (sequelize, DataTypes) => {
  class Duration extends Model {
    static associate(models) {
      Duration.belongsTo(Maintreatment, {
        foreignKey: "mainTreatmentId",
        as: "mainTreatment",
      });
      Duration.belongsTo(Service, {
        foreignKey: "serviceId",
        as: "service",
      });
    }
  }
  Duration.init(
    {
      duration_sessions: DataTypes.STRING,
      sessions_quantity: DataTypes.INTEGER,
      sessions_interval: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Duration",
    }
  );
  return Duration;
};
