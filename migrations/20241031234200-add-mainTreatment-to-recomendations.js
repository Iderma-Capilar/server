"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Recommendations", "mainTreatmentId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "MainTreatments",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Recommendations", "mainTreatmentId");
  },
};
