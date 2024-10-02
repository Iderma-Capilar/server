import { DataTypes } from "sequelize";
import { sequelize } from "../../index.js";

const NewsLetterRegister = sequelize.define(
  "NewsLetterRegister",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
  },
  {
    tableName: "news_letter_register",
  }
);

export default NewsLetterRegister;
