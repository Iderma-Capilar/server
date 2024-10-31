"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Duration extends Model {
    static associate(models) {
      Duration.belongsTo(models.MainTreatments, {
        foreignKey: "mainTreatmentId",
        as: "mainTreatment",
      });
      Duration.belongsTo(models.Service, {
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
      mainTreatmentId: DataTypes.INTEGER,
      serviceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Duration",
      freezeTableName: true,
    }
  );
  return Duration;
};
