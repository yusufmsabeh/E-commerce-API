"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", [
      {
        title: "skincare",
      },
      {
        title: "Personal Care",
      },
      {
        title: "Handbags",
      },
      {
        title: "Apparels",
      },
      {
        title: "Watches",
      },
      {
        title: "Eye Wear",
      },
      {
        title: "Jewellery",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
