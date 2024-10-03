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
// Relación uno a muchos con preguntas y respuestas (QuestionAnswer)
Service.hasMany(QuestionAnswer, {
  foreignKey: "productId",
  constraints: false,
  as: "qa",
});
QuestionAnswer.belongsTo(Service, { foreignKey: "productId", as: "service" });

// Relación muchos a muchos con MainTreatment a través de tabla intermedia
Service.belongsToMany(MainTreatment, {
  as: "associatedMainTreatments",
  through: ServiceMainTreatment,
  foreignKey: "serviceId",
  otherKey: "mainTreatmentId",
});

MainTreatment.belongsToMany(Service, {
  as: "services",
  through: ServiceMainTreatment,
  foreignKey: "mainTreatmentId",
  otherKey: "serviceId",
});

// COMPLEMENTARY TREATMENT
// --------------------------------------------------------------
// Relación uno a muchos entre MainTreatment y Complementary
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
// Relación uno a muchos con otros modelos
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

// Relación inversa entre MainTreatment y otros modelos
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
// Relación con Technology para que una pregunta pueda estar asociada a un producto o una tecnología
QuestionAnswer.belongsTo(Technology, {
  foreignKey: "productId",
  as: "technology",
});

await Service.sync();
await MainTreatment.sync();
await Complementary.sync();
await ServiceMainTreatment.sync();
await QuestionAnswer.sync();
await Benefit.sync();
await Duration.sync();
await Recommendations.sync();
await SecondaryEffects.sync();
await Technology.sync();
