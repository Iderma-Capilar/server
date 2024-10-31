"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Problem extends Model {
    static associate(models) {
      Problem.belongsTo(models.Service, {
        foreignKey: "serviceId",
        as: "service",
      });
    }
  }
  Problem.init(
    {
      description: DataTypes.TEXT,
      solution: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Problem",
    }
  );
  return Problem;
};
