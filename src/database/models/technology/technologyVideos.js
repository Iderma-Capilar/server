import { DataTypes } from "sequelize";
import { sequelize } from "../../index.js";
import Technology from "./technology.js";

const TechnologyVideo = sequelize.define(
  "TechnologyVideo",
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
    videoUrl: {
      type: DataTypes.STRING,
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
  },
  {
    tableName: "technology_videos",
  }
);

export default TechnologyVideo;
