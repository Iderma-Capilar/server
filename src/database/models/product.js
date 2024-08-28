import { DataTypes } from "sequelize";
import { sequelize } from "../index.js";
import Category from "./category.js";

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
    },
    miniature: {
      type: DataTypes.STRING(255),
    },
    description: {
      type: DataTypes.STRING(255),
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "id",
      },
    },
  },
  {
    tableName: "product",
    timestamps: false,
  }
);

export default Product;
