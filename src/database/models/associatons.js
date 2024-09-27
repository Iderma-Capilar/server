import Benefit from "./benefit/benefit.js";
import QuestionAnswer from "./qa/qa.js";
import Duration from "./duration/duration.js";
import MainTreatment from "./mainTreatment/mainTreatment.js";
import Recommendations from "./servicios/recommendations.js";
import Service from "./servicios/services.js";
import Technology from "./technology/technology.js";
import SecondaryEffects from "./duration/secondaryEffects.js";
import Complementary from "./complementaryTreatments/complementary.js";
import ServiceMainTreatment from "./intermediate/serviceMainTreatment.js";

// SERVICE
// --------------------------------------------------------------
Service.hasOne(MainTreatment, {
  as: "mainTreatment",
  foreignKey: "mainTreatmentId",
});
Service.hasMany(QuestionAnswer, {
  foreignKey: "productId",
  constraints: false,
  as: "qa",
});
Service.belongsToMany(MainTreatment, {
  as: "associatedMainTreatments",
  through: ServiceMainTreatment,
  foreignKey: "serviceId",
});

MainTreatment.belongsToMany(Service, {
  through: ServiceMainTreatment,
  foreignKey: "mainTreatmentId",
  otherKey: "serviceId",
  as: "services",
});

// COMPLEMENTARY TREATMENT
// --------------------------------------------------------------
MainTreatment.hasMany(Complementary, {
  foreignKey: "mainTreatmentId",
  as: "complementaryTreatments",
});

Complementary.belongsTo(MainTreatment, {
  foreignKey: "mainTreatmentId",
  as: "mainTreatment",
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
});

// QUESTION AND ANSWER
// --------------------------------------------------------------
QuestionAnswer.belongsTo(Service, { foreignKey: "productId", as: "service" });
QuestionAnswer.belongsTo(Technology, {
  foreignKey: "productId",
  as: "technology",
});
