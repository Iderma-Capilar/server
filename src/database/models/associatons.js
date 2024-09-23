import QuestionAnswer from "./qa/qa.js";
import MainTreatment from "./servicios/mainTreatment.js";
import SecondaryTreatment from "./servicios/secondaryTreatment.js";
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
Service.hasMany(ServiceImage, {
  foreignKey: "serviceId",
  as: "images",
});
Service.hasMany(ServiceVideo, {
  foreignKey: "serviceId",
  as: "videos",
});
Service.hasMany(QuestionAnswer, {
  foreignKey: "qaId",
  as: "qa",
});
Service.hasMany(MainTreatment, {
  foreignKey: "serviceId",
  as: "mainTreatments",
});
Service.hasMany(SecondaryTreatment, {
  foreignKey: "serviceId",
  as: "secondaryTreatment",
});

ServiceImage.belongsTo(Service, { foreignKey: "serviceId" });
ServiceVideo.belongsTo(Service, { foreignKey: "serviceId" });
