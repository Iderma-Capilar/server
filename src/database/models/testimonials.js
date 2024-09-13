import { DataTypes } from "sequelize";
import { sequelize } from "../index.js";

const Testimonials = sequelize.define(
  "TestiminialComments",
  {
    tcomment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "testimonial_comments",
  }
);

export default Testimonials;
