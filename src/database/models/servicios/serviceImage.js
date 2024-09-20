import { DataTypes } from "sequelize";
import { sequelize } from "../../index.js";
import Service from "./services.js";

const ServiceImage = sequelize.define(
  "ServiceImage",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      references: {
        model: Service,
        key: "id",
      },
      allowNull: false,
    },
    imagesUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altText: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "service_images",
  }
);

export default ServiceImage;
