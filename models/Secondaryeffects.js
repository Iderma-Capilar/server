"use strict";
const { Model } = require("sequelize");
const Maintreatment = require("./MainTreatments");
module.exports = (sequelize, DataTypes) => {
  class SecondaryEffects extends Model {
    static associate(models) {
      SecondaryEffects.belongsTo(Maintreatment, {
        foreignKey: "mainTreatmentId",
      });
    }
  }
  SecondaryEffects.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      mainTreatmenId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SecondaryEffects",
    }
  );
  return SecondaryEffects;
};
