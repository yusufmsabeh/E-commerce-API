import { Request } from "express";
import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";

export const buildFilter = (request: Request) => {
  const { type, category, brand } = request.query;
  const where: any = {};
  switch (type) {
  case "new-arrivals":
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    where.createdAt = { [Op.gte]: threeMonthsAgo };
    break;
  case "handpicked":
    where.rate = { [Op.gte]: 4.5 };
    where.price = { [Op.lte]: 100 };
    break;
  case "limited-edition":
    where.isLimited = true;
    break;
  case "discount":
    Object.defineProperty(where, Op.or, {
      value: [
        { discount_type: "percentage", discount: { [Op.gte]: 15 } },
        {
          discount_type: "fixed",
          discount: { [Op.gte]: Sequelize.literal("'price'*0.15") },
        },
      ],
      enumerable: true,
    });
  }
  if (category) {
    where.category_id = { [Op.in]: String(category).split(",") };
  }
  if (brand) {
    where.brand_id = { [Op.in]: String(brand).split(",") };
  }
  return where;
};
