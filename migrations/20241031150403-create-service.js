'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Service', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      slogan: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      technology: {
        type: Sequelize.JSON,
        allowNull: true
      },
      patient_profile: {
        type: Sequelize.TEXT
      },
      cta: {
        type: Sequelize.STRING
      },
      videos: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: [],
      },
      images: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: [],
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Service');
  }
};