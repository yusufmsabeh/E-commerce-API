"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("brands", [
      {
        title: "Zara",
        image_url:
          "https://logowik.com/content/uploads/images/zara-new-20203212.jpg",
      },
      {
        title: "D&G",
        image_url:
          "https://logos-world.net/wp-content/uploads/2020/12/Dolce-Gabbana-Logo.png",
      },
      {
        title: "H&M",
        image_url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1200px-H%26M-Logo.svg.png",
      },
      {
        title: "chanel",
        image_url:
          "https://upload.wikimedia.org/wikipedia/en/thumb/9/92/Chanel_logo_interlocking_cs.svg/1200px-Chanel_logo_interlocking_cs.svg.png",
      },
      {
        title: "prada",
        image_url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Prada-Logo.svg/1280px-Prada-Logo.svg.png",
      },
      {
        title: "biba",
        image_url:
          "https://hindubabynames.info/downloads/wp-content/themes/hbn_download/download/clothing-and-accessories-companies/biba-logo.png",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("brands", null, {});
  },
};
