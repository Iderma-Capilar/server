'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Duration", "serviceId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Service",
        key: "id",
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Duration", "serviceId");
  }
};
