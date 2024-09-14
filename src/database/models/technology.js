import { DataTypes } from "sequelize";
import { sequelize } from "../index.js";

// const Technology = sequelize.define(
//   "Technology",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     thumbnail: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     original: {
//       type: DataTypes.ARRAY(DataTypes.STRING),
//       allowNull: false,
//     },
//     title: {
//       type: DataTypes.STRING(150),
//       allowNull: false,
//     },
//     machineType: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//     },
//     model: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     procedures: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     recommendations: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "technology",
//   }
// );

const Technology = sequelize.define("Technology", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  url_thumbnail: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  url_video: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description_short: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description_large: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  procedures: {
    type: DataTypes.TEXT, 
    allowNull: true,
  },
  recommendations: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  btn_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Technology;
