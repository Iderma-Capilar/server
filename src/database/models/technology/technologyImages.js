import { DataTypes } from "sequelize";
import { sequelize } from "../../index.js";
import Technology from "./technology.js";

const TechnologyImage = sequelize.define(
  "TechnologyImage",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    technologyId: {
      type: DataTypes.INTEGER,
      references: {
        model: Technology,
        key: "id",
      },
      allowNull: false,
    },
    imageUrl: {
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
    tableName: "technology_images",
  }
);

export default TechnologyImage;
