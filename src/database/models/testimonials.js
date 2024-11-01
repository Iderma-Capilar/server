import { DataTypes } from "sequelize";
import { sequelize } from "../index.js";

const Testimonials = sequelize.define(
  "Testiminials",
  {
    id_testimonial: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type_testimonial: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment_short: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thumbnail_username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    video_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    btn_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vide_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "testimonials",
  }
);

export default Testimonials;
