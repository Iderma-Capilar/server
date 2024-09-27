import { DataTypes } from "sequelize";
import { sequelize } from "../../index.js";

const ServiceMainTreatment = sequelize.define(
  "ServiceMainTreatment",
  {
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "services",
        key: "id",
      },
    },
    mainTreatmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "mainTreatments",
        key: "id",
      },
    },
  },
  {
    tableName: "ServiceMainTreatment",
    timestamps: false,
  }
);

export default ServiceMainTreatment;
