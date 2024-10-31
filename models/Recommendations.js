"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Recommendations extends Model {
    static associate(models) {
      Recommendations.belongsTo(models.MainTreatments, {
        foreignKey: "mainTreatmentId",
        as: "mainTreatment",
      });
    }
  }
  Recommendations.init(
    {
      description: DataTypes.TEXT,
      mainTreatmentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Recommendations",
      freezeTableName: true,
    }
  );
  return Recommendations;
};
