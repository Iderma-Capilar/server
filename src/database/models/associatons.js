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
import Problem from "./problem/problem.js";

// Relaciones polimórficas para QuestionAnswer
const questionAnswerOptions = {
  foreignKey: "parentId",
  constraints: false,
  as: "qa",
};

// Relación polimórfica de Service con QuestionAnswer
Service.hasMany(QuestionAnswer, {
  ...questionAnswerOptions,
  scope: { parentType: "service" },
});
QuestionAnswer.belongsTo(Service, {
  foreignKey: "parentId",
  constraints: false,
});

// Relación polimórfica de Technology con QuestionAnswer
Technology.hasMany(QuestionAnswer, {
  ...questionAnswerOptions,
  scope: { parentType: "technology" },
});
QuestionAnswer.belongsTo(Technology, {
  foreignKey: "parentId",
  constraints: false,
});

// Relación polimórfica de MainTreatment con QuestionAnswer
MainTreatment.hasMany(QuestionAnswer, {
  ...questionAnswerOptions,
  scope: { parentType: "mainTreatment" },
});
QuestionAnswer.belongsTo(MainTreatment, {
  foreignKey: "parentId",
  constraints: false,
});

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

// Relación uno a muchos entre Service y Benefit
Service.hasMany(Benefit, {
  foreignKey: "serviceId",
  as: "benefits",
});
Benefit.belongsTo(Service, {
  foreignKey: "serviceId",
  as: "service",
});

// Relación entre MainTreatment y Complementary
MainTreatment.hasMany(Complementary, {
  foreignKey: "mainTreatmentId",
  as: "complementaryTreatments",
});
Complementary.belongsTo(MainTreatment, {
  foreignKey: "mainTreatmentId",
  as: "mainTreatment",
});

// Relaciones adicionales para MainTreatment
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
SecondaryEffects.belongsTo(MainTreatment, { foreignKey: "mainTreatmentId" });

// Relación uno a muchos entre Service y Problem
Service.hasMany(Problem, {
  foreignKey: "serviceId",
  as: "problems",
});
Problem.belongsTo(Service, {
  foreignKey: "serviceId",
  as: "service",
});

// Relación uno a muchos entre Service y Duration
Service.hasMany(Duration, {
  foreignKey: "serviceId",
  as: "duration",
});
Duration.belongsTo(Service, {
  foreignKey: "serviceId",
  as: "service",
});

// Sincronización de tablas
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
await Problem.sync();
await Duration.sync();
