"use strict";
const { Model } = require("sequelize");
const Maintreatment = require("./MainTreatments");
module.exports = (sequelize, DataTypes) => {
  class Complementary extends Model {
    static associate(models) {
      Complementary.belongsTo(Maintreatment, {
        foreignKey: "mainTreatmentId",
        as: "MainTreatments",
      });
    }
  }
  Complementary.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      mainTreatmentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Complementary",
    }
  );
  return Complementary;
};
