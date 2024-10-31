const dotenv = require("dotenv");
const { sequelize } = require("../../utils/index.js");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { Newsletterregister } = require("../../../models");

dotenv.config();

const { MAILCHIMP_API_KEY, MAILCHIMP_SERVER, MAILCHIMP_LIST_ID } = process.env;

mailchimp.setConfig({
  apiKey: MAILCHIMP_API_KEY,
  server: MAILCHIMP_SERVER,
});

const newUser = async (req, res) => {
  const { email } = req.body;
  const transacción = await sequelize.transaction();

  try {
    const user = await Newsletterregister.create(
      { email },
      { transaction: transacción }
    );

    const listId = MAILCHIMP_LIST_ID;
    await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: "subscribed",
    });

    await transacción.commit();

    res.status(201).json({
      message: "Usuario creado y registrado en mailchimp",
      user: user,
    });
  } catch (error) {
    await transacción.rollback();

    console.error("Error al registrar el usuario", error);
    res.status(500).json({
      message: "Error al registrar el usuario",
      error: error.message,
    });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const users = await Newsletterregister.findAll();
    res.status(200).json({
      message: "Usuarios obtenidos exitosamente",
      users,
    });
  } catch (error) {
    console.error("Error al  obtener los usuarios", error);
    res.status(500).json({
      message: "Error al obtener la lista de usuarios",
      error: error.message,
    });
  }
};

module.exports = {
  newUser,
  getAllUsers,
};
