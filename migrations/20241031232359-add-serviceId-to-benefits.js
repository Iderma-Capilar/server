"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Benefit", "serviceId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Service",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Benefit", "serviceId");
  },
};
