import Benefit from "./benefit/benefit.js";
import QuestionAnswer from "./qa/qa.js";
import Duration from "./duration/duration.js";
import MainTreatment from "./mainTreatment/mainTreatment.js";
import Recommendations from "./servicios/recommendations.js";
import Service from "./servicios/services.js";
import Technology from "./technology/technology.js";
import TechnologyImage from "./technology/technologyImages.js";
import TechnologyVideo from "./technology/technologyVideos.js";
import SecondaryEffects from "./duration/secondaryEffects.js";
import ComplementaryTreatment from "./complementaryTreatments/complementary.js";

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
Service.belongsTo(MainTreatment, {
  foreignKey: "mainTreatmentId",
  as: "mainTreatment",
});
Service.hasMany(QuestionAnswer, {
  foreignKey: "productId",
  constraints: false,
  as: "qa",
});
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

// COMPLEMENTARY TREATMENT
// --------------------------------------------------------------
ComplementaryTreatment.hasMany(MainTreatment, {
  foreignKey: "complementaryTreatmentId",
  as: "relatedMainTreatments",
});
ComplementaryTreatment.belongsTo(MainTreatment, {
  foreignKey: "mainTreatmentId",
  as: "mainComplementaryTreatment",
});

// MAIN TREATMENT
// --------------------------------------------------------------
MainTreatment.hasMany(Benefit, {
  foreignKey: "mainTreatmentId",
  as: "benefits",
});
MainTreatment.hasMany(Recommendations, {
  foreignKey: "mainTreatmentId",
  as: "recommendations",
});
MainTreatment.hasMany(Duration, {
  foreignKey: "mainTreatmentId",
  as: "durations",
});
MainTreatment.hasMany(Technology, {
  foreignKey: "mainTreatmentId",
  as: "technologies",
});
MainTreatment.hasMany(SecondaryEffects, {
  foreignKey: "mainTreatmentId",
  as: "secondaryEffects",
});

Benefit.belongsTo(MainTreatment, {
  foreignKey: "mainTreatmentId",
  as: "mainTreatment",
});

Duration.belongsTo(MainTreatment, {
  foreignKey: "mainTreatmentId",
  as: "mainTreatment",
});
Recommendations.belongsTo(MainTreatment, {
  foreignKey: "mainTreatmentId",
  as: "mainTreatment",
});
SecondaryEffects.belongsTo(MainTreatment, {
  foreignKey: "mainTreatmentId",
  as: "mainTreatment",
});

// QUESTION AND ANSWER
// --------------------------------------------------------------
QuestionAnswer.belongsTo(Service, { foreignKey: "productId", as: "service" });
QuestionAnswer.belongsTo(Technology, {
  foreignKey: "productId",
  as: "technology",
});
