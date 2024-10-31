"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Complementary extends Model {
    static associate(models) {
      Complementary.belongsTo(models.MainTreatments, {
        foreignKey: "mainTreatmentId",
        as: "mainTreatment",
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
      freezeTableName: true,
    }
  );
  return Complementary;
};
