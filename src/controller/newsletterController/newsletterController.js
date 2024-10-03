import dotenv from "dotenv";
import { sequelize } from "../../database/index.js";
import mailchimp from "@mailchimp/mailchimp_marketing";
import NewsLetterRegister from "../../database/models/newsletter/newsletter.js";
dotenv.config();
const { MAILCHIMP_API_KEY, MAILCHIMP_SERVER, MAILCHIMP_LIST_ID } = process.env;

mailchimp.setConfig({
  apiKey: MAILCHIMP_API_KEY,
  server: MAILCHIMP_SERVER,
});

export const newUser = async (req, res) => {
  const { email } = req.body;
  const transacción = await sequelize.transaction();

  try {
    const user = await NewsLetterRegister.create(
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
      message: "Usuario creado y registrado en MailChimp exitosamente",
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
