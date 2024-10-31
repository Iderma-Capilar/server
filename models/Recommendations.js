"use strict";
const { Model } = require("sequelize");
const Maintreatment = require("./MainTreatments");
module.exports = (sequelize, DataTypes) => {
  class Recommendations extends Model {
    static associate(models) {
      Recommendations.belongsTo(Maintreatment, {
        foreignKey: "mainTreatmentId",
        as: "mainTreatment",
      });
    }
  }
  Recommendations.init(
    {
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Recommendations",
    }
  );
  return Recommendations;
};
