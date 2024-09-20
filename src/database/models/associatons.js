import ServiceImage from "./servicios/serviceImage.js";
import Service from "./servicios/services.js";
import ServiceVideo from "./servicios/serviceVideo.js";
import Technology from "./technology/technology.js";
import TechnologyImage from "./technology/technologyImages.js";
import TechnologyVideo from "./technology/technologyVideos.js";

Technology.hasMany(TechnologyImage, {
  foreignKey: "technologyId",
  as: "images",
});
Technology.hasMany(TechnologyVideo, {
  foreignKey: "technologyId",
  as: "videos",
});
Service.hasMany(ServiceImage, { foreignKey: "serviceId" });
Service.hasMany(ServiceVideo, { foreignKey: "serviceId" });
ServiceImage.belongsTo(Service, { foreignKey: "serviceId" });
ServiceVideo.belongsTo(Service, { foreignKey: "serviceId" });
