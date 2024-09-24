import Benefit from "./benefit/benefit.js";
import QuestionAnswer from "./qa/qa.js";
import MainTreatment from "./servicios/mainTreatment.js";
import SecondaryTreatment from "./servicios/secondaryTreatment.js";
import ServiceImage from "./servicios/serviceImage.js";
import Service from "./servicios/services.js";
import ServiceVideo from "./servicios/serviceVideo.js";
import Technology from "./technology/technology.js";
import TechnologyImage from "./technology/technologyImages.js";
import TechnologyVideo from "./technology/technologyVideos.js";

// TECHNOLOGY
// --------------------------------------------------------------
Technology.hasMany(TechnologyImage, {
  foreignKey: "technologyId",
  as: "images",
});
TechnologyImage.belongsTo(Technology, {
  foreignKey: "technologyId",
  as: "technology",
});

Technology.hasMany(TechnologyVideo, {
  foreignKey: "technologyId",
  as: "videos",
});
TechnologyVideo.belongsTo(Technology, {
  foreignKey: "technologyId",
  as: "technology",
});

// SERVICE
// --------------------------------------------------------------
Service.hasMany(ServiceImage, {
  foreignKey: "serviceId",
  as: "images",
});
ServiceImage.belongsTo(Service, {
  foreignKey: "serviceId",
  as: "service",
});

Service.hasMany(ServiceVideo, {
  foreignKey: "serviceId",
  as: "videos",
});
ServiceVideo.belongsTo(Service, {
  foreignKey: "serviceId",
  as: "service",
});

Service.hasMany(MainTreatment, {
  foreignKey: "serviceId",
  as: "mainTreatments",
});
MainTreatment.belongsTo(Service, {
  foreignKey: "serviceId",
  as: "service",
});

Service.hasMany(SecondaryTreatment, {
  foreignKey: "serviceId",
  as: "secondaryTreatments",
});
SecondaryTreatment.belongsTo(Service, {
  foreignKey: "serviceId",
  as: "service",
});

// COMPARTIDO
// --------------------------------------------------------------
Service.hasMany(QuestionAnswer, {
  foreignKey: "productId",
  as: "qa",
});
QuestionAnswer.belongsTo(Service, {
  foreignKey: "productId",
  as: "service",
});

Technology.hasMany(QuestionAnswer, {
  foreignKey: "productId",
  as: "qa",
});
QuestionAnswer.belongsTo(Technology, {
  foreignKey: "productId",
  as: "technology",
});

Service.hasMany(Benefit, {
  foreignKey: "productId",
  as: "serviceBenefits",
});
Benefit.belongsTo(Service, {
  foreignKey: "productId",
  as: "service",
});

Technology.hasMany(Benefit, {
  foreignKey: "productId",
  as: "technologyBenefits",
});
Benefit.belongsTo(Technology, {
  foreignKey: "productId",
  as: "technology",
});
