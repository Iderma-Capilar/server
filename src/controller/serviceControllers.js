import { sequelize } from "../database/index.js";
import Benefit from "../database/models/benefit/benefit.js";
import QuestionAnswer from "../database/models/qa/qa.js";
import MainTreatment from "../database/models/servicios/mainTreatment.js";
import SecondaryTreatment from "../database/models/servicios/secondaryTreatment.js";
import ServiceImage from "../database/models/servicios/serviceImage.js";
import Service from "../database/models/servicios/services.js";
import ServiceVideo from "../database/models/servicios/serviceVideo.js";

//--------------------------------------------------------------------------------------------
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      include: [
        { model: ServiceImage, as: "images" },
        { model: ServiceVideo, as: "videos" },
        { model: QuestionAnswer, as: "qa" },
        { model: MainTreatment, as: "mainTreatments" },
        { model: SecondaryTreatment, as: "secondaryTreatments" },
        { model: Benefit, as: "serviceBenefits" },
      ],
    });

    res.status(200).json({
      ok: true,
      status: 200,
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error getting services",
      error: error.message,
    });
  }
};

//--------------------------------------------------------------------------------------------

export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id, {
      include: [
        { model: ServiceImage, as: "images" },
        { model: ServiceVideo, as: "videos" },
        { model: QuestionAnswer, as: "qa" },
        { model: MainTreatment, as: "mainTreatments" },
        { model: SecondaryTreatment, as: "secondaryTreatments" },
        { model: Benefit, as: "serviceBenefits" },
      ],
    });
    if (!service) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Service not found",
      });
    }
    res.status(200).json({
      ok: true,
      status: 200,
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error getting service",
      error: error.message,
    });
  }
};

//--------------------------------------------------------------------------------------------

// CREAR SERVICIO NUEVO
// export const createService = async (req, res) => {
//   try {
//     const {
//       name,
//       slogan,
//       description,
//       duration,
//       recommendations,
//       videos,
//       images,
//       questions,
//       mainTreatments,
//       secondaryTreatments,
//       benefits,
//     } = req.body;

//     // Validar campos obligatorios
//     if (!name || !description) {
//       return res.status(400).json({
//         ok: false,
//         status: 400,
//         message: "Name and description are required.",
//       });
//     }

//     // Validar el tratamiento principal
//     if (
//       !mainTreatments ||
//       !Array.isArray(mainTreatments) ||
//       mainTreatments.length === 0
//     ) {
//       return res.status(400).json({
//         ok: false,
//         status: 400,
//         message: "At least one main treatment is required.",
//       });
//     }

//     // Validar el tratamiento secundario si está presente
//     if (secondaryTreatments && !Array.isArray(secondaryTreatments)) {
//       return res.status(400).json({
//         ok: false,
//         status: 400,
//         message: "Secondary treatments must be an array if provided.",
//       });
//     }

//     // Crear el nuevo servicio
//     const newService = await Service.create({
//       name,
//       slogan,
//       description,
//       duration,
//       recommendations,
//     });

//     // Crear los videos asociados
//     if (videos && Array.isArray(videos)) {
//       for (const video of videos) {
//         await ServiceVideo.create({
//           serviceId: newService.id,
//           videoUrl: video.videoUrl,
//           description: video.description,
//         });
//       }
//     }

//     // Crear los tratamientos principales asociados
//     for (const treatment of mainTreatments) {
//       if (!treatment.type || !treatment.duration) {
//         return res.status(400).json({
//           ok: false,
//           status: 400,
//           message: "Each main treatment must have a type and duration.",
//         });
//       }

//       await MainTreatment.create({
//         serviceId: newService.id,
//         type: treatment.type,
//         duration: treatment.duration,
//       });
//     }

//     // Crear los tratamientos secundarios asociados
//     if (secondaryTreatments) {
//       for (const treatment of secondaryTreatments) {
//         if (!treatment.type || !treatment.duration) {
//           return res.status(400).json({
//             ok: false,
//             status: 400,
//             message: "Each secondary treatment must have a type and duration.",
//           });
//         }

//         await SecondaryTreatment.create({
//           serviceId: newService.id,
//           type: treatment.type,
//           duration: treatment.duration,
//         });
//       }
//     }

//     // Crear las imágenes asociadas
//     if (images && Array.isArray(images)) {
//       for (const image of images) {
//         await ServiceImage.create({
//           serviceId: newService.id,
//           imagesUrl: image.imagesUrl,
//           altText: image.altText,
//         });
//       }
//     }

//     // Crear las preguntas y respuestas
//     if (questions && Array.isArray(questions)) {
//       for (const question of questions) {
//         await QuestionAnswer.create({
//           qaType: "service",
//           productId: newService.id,
//           question: question.question,
//           answer: question.answer,
//         });
//       }
//     }

//     // Crear los beneficios asociados
//     if (benefits && Array.isArray(benefits)) {
//       for (const benefit of benefits) {
//         await Benefit.create({
//           benefit_type: "service",
//           productId: newService.id,
//           title: benefit.title,
//           description: benefit.description,
//         });
//       }
//     }

//     res.status(201).json({
//       ok: true,
//       status: 201,
//       data: newService,
//     });
//   } catch (error) {
//     res.status(500).json({
//       ok: false,
//       status: 500,
//       message: "Error creating service",
//       error: error.message,
//     });
//   }
// };
export const createService = async (req, res) => {
  const transaction = await sequelize.transaction(); // Iniciar transacción
  try {
    const {
      name,
      slogan,
      description,
      duration,
      recommendations,
      videos = [],
      images = [],
      questions = [],
      mainTreatments = [],
      secondaryTreatments = [],
      benefits = [],
    } = req.body;

    // Validar campos obligatorios
    if (!name || !description) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Name and description are required.",
      });
    }

    if (!mainTreatments.length) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "At least one main treatment is required.",
      });
    }

    // Crear el nuevo servicio
    const newService = await Service.create(
      {
        name,
        slogan,
        description,
        duration,
        recommendations,
      },
      { transaction }
    );

    // Funciones para crear asociaciones
    const createAssociations = async (
      Model,
      data,
      serviceId,
      extraFields = {}
    ) => {
      if (data.length) {
        await Model.bulkCreate(
          data.map((item) => ({ ...item, serviceId, ...extraFields })),
          { transaction }
        );
      }
    };

    // Crear asociaciones: videos, imágenes, preguntas, tratamientos, beneficios
    await createAssociations(ServiceVideo, videos, newService.id);
    await createAssociations(ServiceImage, images, newService.id);
    await createAssociations(QuestionAnswer, questions, newService.id, {
      qaType: "service",
      productId: newService.id,
    });
    await createAssociations(MainTreatment, mainTreatments, newService.id);
    await createAssociations(
      SecondaryTreatment,
      secondaryTreatments,
      newService.id
    );
    await createAssociations(Benefit, benefits, newService.id, {
      benefit_type: "service",
      productId: newService.id,
    });

    // Confirmar transacción
    await transaction.commit();

    // Obtener servicio con las asociaciones
    const serviceWithAssociations = await Service.findByPk(newService.id, {
      include: [
        { model: ServiceImage, as: "images" },
        { model: ServiceVideo, as: "videos" },
        { model: QuestionAnswer, as: "qa" },
        { model: MainTreatment, as: "mainTreatments" },
        { model: SecondaryTreatment, as: "secondaryTreatments" },
        { model: Benefit, as: "serviceBenefits" },
      ],
    });

    res.status(201).json({
      ok: true,
      status: 201,
      data: serviceWithAssociations,
    });
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error creating service",
      error: error.message,
    });
  }
};

//--------------------------------------------------------------------------------------------

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      slogan,
      image,
      description,
      main_treatment,
      secondary_treatment,
      duration,
      recommendations,
      qa,
    } = req.body;

    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Service not found",
      });
    }

    await service.update({
      name,
      slogan,
      image,
      description,
      main_treatment,
      secondary_treatment,
      duration,
      recommendations,
      qa,
    });

    res.status(200).json({
      ok: true,
      status: 200,
      data: service,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error updating service",
      error: error.message,
    });
  }
};

//--------------------------------------------------------------------------------------------

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Service not found",
      });
    }

    await service.destroy();

    res.status(200).json({
      ok: true,
      status: 200,
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: "Error deleting service",
      error: error.message,
    });
  }
};
