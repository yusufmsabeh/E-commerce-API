"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("brands", null, {});
    const brandsId = await queryInterface.bulkInsert("brands", [
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
    await queryInterface.bulkDelete("categories", null, {});
    const categoriesId = await queryInterface.bulkInsert("categories", [
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
      {
        title: "Cloths",
      },
    ]);
    await queryInterface.bulkDelete("products", null, {});
    const productsId = await queryInterface.bulkInsert("products", [
      {
        title: "Vintage Denim Jacket",
        description:
          "A classic denim jacket with a distressed finish and retro design.",
        price: 59.99,
        brand_id: brandsId,
        category_id: categoriesId,
        rate: 4.5,
        isLimited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Striped Cotton T-Shirt",
        description:
          "A comfortable cotton t-shirt with a stylish striped pattern.",
        price: 19.99,
        brand_id: brandsId,
        category_id: categoriesId,
        rate: 4.5,
        isLimited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Leather Biker Jacket",
        description:
          "A sleek and edgy leather jacket with a biker-inspired design.",
        price: 129.99,
        brand_id: brandsId,
        category_id: categoriesId,
        rate: 4.7,
        isLimited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Floral Print Sundress",
        description: "A charming sundress adorned with a vibrant floral print.",
        price: 39.99,
        brand_id: brandsId,
        category_id: categoriesId,
        rate: 4.7,
        isLimited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Plaid Wool Scarf",
        description: "A cozy wool scarf featuring a classic plaid pattern.",
        price: 24.99,
        brand_id: brandsId,
        category_id: categoriesId,
        rate: 5,
        isLimited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Cotton Cargo Pants",
        description:
          "Durable and functional cargo pants made from soft cotton fabric.",
        price: 49.99,
        brand_id: brandsId,
        category_id: categoriesId,
        rate: 3,
        isLimited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Embroidered Boho Blouse",
        description:
          "A bohemian-inspired blouse with intricate embroidery details.",
        price: 34.99,
        brand_id: brandsId,
        category_id: categoriesId + 1,
        rate: 3,
        isLimited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Knit Beanie Hat",
        description:
          "A warm and stylish beanie hat made from soft knit material.",
        price: 14.99,
        brand_id: brandsId,
        category_id: categoriesId + 1,
        rate: 3,
        isLimited: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Linen Button-Up Shirt",
        description:
          "A lightweight and breathable linen shirt with a button-up front.",
        price: 29.99,
        brand_id: brandsId + 1,
        category_id: categoriesId + 1,
        rate: 3,
        isLimited: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Athletic Jogging Shorts",
        description: "Comfortable and sporty shorts for an active lifestyle.",
        price: 19.99,
        brand_id: brandsId + 1,
        category_id: categoriesId + 1,
        rate: 3,
        isLimited: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Suede Ankle Boots",
        description: "Stylish ankle boots made from luxurious suede material.",
        price: 79.99,
        brand_id: brandsId + 1,
        category_id: categoriesId + 1,
        rate: 3,
        isLimited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Graphic Print Hoodie",
        description:
          "A trendy hoodie featuring a cool graphic print on the front.",
        price: 39.99,
        brand_id: brandsId + 1,
        category_id: categoriesId + 2,
        rate: 3,
        isLimited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Ruffled Maxi Dress",
        description: "An elegant maxi dress with feminine ruffle details.",
        price: 59.99,
        brand_id: brandsId + 1,
        category_id: categoriesId + 2,
        rate: 3,
        isLimited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Classic Aviator Sunglasses",
        description:
          "Timeless aviator sunglasses with a metal frame and UV protection.",
        price: 19.99,
        brand_id: brandsId + 1,
        category_id: categoriesId + 2,
        rate: 3,
        isLimited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Striped Knit Sweater",
        description: "A cozy knit sweater with a playful striped pattern.",
        price: 49.99,
        brand_id: brandsId + 1,
        category_id: categoriesId + 2,
        rate: 3,
        isLimited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Denim Mini Skirt",
        description: "A versatile mini skirt made from durable denim fabric.",
        price: 29.99,
        brand_id: brandsId + 1,
        category_id: categoriesId + 2,
        rate: 3,
        isLimited: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Polka Dot Blouse",
        description:
          "A charming blouse adorned with a classic polka dot pattern.",
        price: 24.99,
        brand_id: brandsId + 2,
        category_id: categoriesId + 3,
        rate: 3,
        isLimited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Leather Crossbody Bag",
        description:
          "A stylish and functional crossbody bag made from genuine leather.",
        price: 89.99,
        brand_id: brandsId + 2,
        category_id: categoriesId + 3,
        rate: 3,
        isLimited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Cargo Shorts",
        description:
          "Casual and practical shorts with multiple pockets for storage.",
        price: 29.99,
        brand_id: brandsId + 2,
        category_id: categoriesId + 3,
        rate: 3,
        isLimited: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Tropical Print Swim Trunks",
        description:
          "Vibrant swim trunks featuring a tropical print for a beach-ready look.",
        price: 34.99,
        brand_id: brandsId + 5,
        category_id: categoriesId + 3,
        rate: 3,
        isLimited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Wool Blend Peacoat",
        description:
          "A timeless peacoat crafted from a warm wool blend fabric.",
        price: 89.99,
        brand_id: brandsId + 2,
        category_id: categoriesId + 3,
        rate: 3,
        isLimited: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Printed Leggings",
        description:
          "Comfortable and eye-catching leggings with a unique printed design.",
        price: 19.99,
        brand_id: brandsId + 2,
        category_id: categoriesId + 4,
        rate: 3,
        isLimited: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Cotton V-Neck Sweater",
        description:
          "A classic V-neck sweater made from soft and breathable cotton.",
        price: 39.99,
        brand_id: brandsId + 2,
        category_id: categoriesId + 4,
        rate: 3,
        isLimited: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Embroidered Denim Shorts",
        description:
          "Stylish denim shorts featuring intricate embroidery details.",
        price: 34.99,
        brand_id: brandsId + 2,
        category_id: categoriesId + 4,
        rate: 3,
        isLimited: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Knit Infinity Scarf",
        description:
          "A cozy and versatile infinity scarf made from warm knit fabric.",
        price: 19.99,
        brand_id: brandsId + 5,
        category_id: categoriesId + 4,
        rate: 3,
        isLimited: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Lace Trim Camisole",
        description: "A delicate camisole with lace trim for a feminine touch.",
        price: 24.99,
        brand_id: brandsId + 5,
        category_id: categoriesId + 4,
        rate: 3,
        isLimited: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Quilted Puffer Jacket",
        description:
          "A lightweight puffer jacket with a quilted design for added warmth.",
        price: 59.99,
        brand_id: brandsId + 3,
        category_id: categoriesId + 5,
        rate: 3,
        isLimited: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Striped Linen Shorts",
        description:
          "Casual and breathable shorts made from lightweight linen fabric.",
        price: 29.99,
        brand_id: brandsId + 3,
        category_id: categoriesId + 5,
        rate: 3,
       
        isLimited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Faux Leather Leggings",
        description: "Sleek and edgy leggings made from faux leather material.",
        price: 29.99,
        brand_id: brandsId + 3,
        category_id: categoriesId + 5,
        rate: 3,
        isLimited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Cotton Blend Cardigan",
        description:
          "A cozy and versatile cardigan made from a soft cotton blend.",
        price: 44.99,
        brand_id: brandsId + 3,
        category_id: categoriesId + 5,
        rate: 3,
        isLimited: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Printed Silk Scarf",
        description:
          "A luxurious silk scarf adorned with a vibrant printed design.",
        price: 49.99,
        brand_id: brandsId + 3,
        category_id: categoriesId + 5,
        rate: 3,
        isLimited: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Hooded Parka Jacket",
        description:
          "A stylish parka jacket with a cozy hood and faux fur trim.",
        price: 79.99,
        brand_id: brandsId + 3,
        category_id: categoriesId + 6,
        rate: 3,
        isLimited: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Ruffled Blouse",
        description:
          "A chic blouse with delicate ruffle details for an elegant look.",
        price: 39.99,
        brand_id: brandsId + 4,
        category_id: categoriesId + 6,
        rate: 3,
        isLimited: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Denim Overalls",
        description:
          "Classic denim overalls with adjustable straps and multiple pockets.",
        price: 54.99,
        brand_id: brandsId + 4,
        category_id: categoriesId + 6,
        rate: 3,
        isLimited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Knit Sweater Dress",
        description: "A cozy sweater dress perfect for colder weather.",
        price: 49.99,
        brand_id: brandsId + 4,
        category_id: categoriesId + 7,
        rate: 3,
        isLimited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Tie-Dye T-Shirt",
        description:
          "A trendy tie-dye t-shirt with a relaxed and colorful design.",
        price: 24.99,
        brand_id: brandsId + 4,
        category_id: categoriesId + 7,
        rate: 3,
        isLimited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Wide-Leg Linen Pants",
        description:
          "Flowy and comfortable linen pants with a wide-leg silhouette.",
        price: 44.99,
        brand_id: brandsId + 4,
        category_id: categoriesId + 7,
        rate: 3,
        isLimited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const productImageUrl =
      "https://cdn.vox-cdn.com/thumbor/QgEMwYKlcK9fSFsZD2FIe9SouxM=/0x0:4915x3930/1200x800/filters:focal(1719x1156:2505x1942)/cdn.vox-cdn.com/uploads/chorus_image/image/61753005/clothingrack.0.jpg";
    await queryInterface.bulkDelete("product_images", null, {});
    for (let i = 0; i < 37; i++) {
      await queryInterface.bulkInsert("product_images", [
        {
          image_url: productImageUrl,
          image_alt: productImageUrl,
          product_id: productsId + i,
        },
      ]);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("brands", null, {});
    await queryInterface.bulkDelete("categories", null, {});
    await queryInterface.bulkDelete("product_images", null, {});
    await queryInterface.bulkDelete("products", null, {});
  },
};
