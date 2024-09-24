import { DataTypes } from "sequelize";
import { sequelize } from "../../index.js";
import Service from "./services.js";

const ServiceVideo = sequelize.define("ServiceVideo", {
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
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default ServiceVideo;
