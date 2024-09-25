import Benefit from "./benefit/benefit.js";
import QuestionAnswer from "./qa/qa.js";
import Duration from "./duration/duration.js";
import MainTreatment from "./mainTreatment/mainTreatment.js";
import Recommendations from "./servicios/recommendations.js";
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

// Nueva relación con Recommendations
Service.hasMany(Recommendations, {
  foreignKey: "serviceId",
  as: "recommendations",
});
Recommendations.belongsTo(Service, {
  foreignKey: "serviceId",
  as: "service",
});

// Nueva relación con Duration
Service.hasMany(Duration, {
  foreignKey: "serviceId",
  as: "durations",
});
Duration.belongsTo(Service, {
  foreignKey: "serviceId",
  as: "service",
});

// MAIN TREATMENT
// --------------------------------------------------------------
// Relación con Duration
MainTreatment.hasMany(Duration, {
  foreignKey: "mainTreatmentId",
  as: "durations",
});
Duration.belongsTo(MainTreatment, {
  foreignKey: "mainTreatmentId",
  as: "mainTreatment",
});

MainTreatment.hasMany(Technology, {
  foreignKey: "mainTreatmentId",
  as: "technologies",
});
Technology.belongsTo(MainTreatment, {
  foreignKey: "mainTreatmentId",
  as: "mainTreatment",
});

MainTreatment.hasMany(SecondaryTreatment, {
  foreignKey: "mainTreatmentId",
  as: "secondaryTreatments",
});
SecondaryTreatment.belongsTo(MainTreatment, {
  foreignKey: "mainTreatmentId",
  as: "mainTreatment",
});

// Relación con Testimonios
// MainTreatment.hasMany(Testimonial, {
//   foreignKey: "mainTreatmentId",
//   as: "testimonials",
// });
// Testimonial.belongsTo(MainTreatment, {
//   foreignKey: "mainTreatmentId",
//   as: "mainTreatmentTestimonials",
// });

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

// MUCHOS A MUCHOS
// --------------------------------------------------------------
Service.belongsToMany(MainTreatment, {
  through: "ServiceMainTreatment",
  as: "associatedMainTreatments",
  foreignKey: "serviceId",
});
MainTreatment.belongsToMany(Service, {
  through: "ServiceMainTreatment",
  as: "services",
  foreignKey: "mainTreatmentId",
});
