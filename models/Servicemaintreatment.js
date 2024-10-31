'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceMainTreatment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ServiceMainTreatment.init({
    serviceId: DataTypes.INTEGER,
    mainTreatmentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ServiceMainTreatment',
  });
  return ServiceMainTreatment;
};