"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SecondaryEffects extends Model {
    static associate(models) {
      SecondaryEffects.belongsTo(models.MainTreatments, {
        foreignKey: "mainTreatmentId",
        as: "mainTreatment",
      });
    }
  }
  SecondaryEffects.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      mainTreatmentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SecondaryEffects",
      freezeTableName: true,
    }
  );
  return SecondaryEffects;
};