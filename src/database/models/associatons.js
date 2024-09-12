import Category from "./category.js";
import Service from "./services.js";

Service.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
Category.hasMany(Service, { foreignKey: "categoryId", as: "service" });