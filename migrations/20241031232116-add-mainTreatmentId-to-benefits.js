"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Benefit", "mainTreatmentId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "MainTreatments",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Benefit", "mainTreatmentId");
  },
};