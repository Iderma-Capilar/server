"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Benefit extends Model {
    static associate(models) {
      Benefit.belongsTo(models.MainTreatments, {
        foreignKey: "mainTreatmentId",
        as: "mainTreatment",
      });
      Benefit.belongsTo(models.Service, {
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
      freezeTableName: true,
    }
  );
  return Benefit;
};
