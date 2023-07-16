import { Request } from "express";
import { Op } from "sequelize";

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
  case "discount":
    where.discount = { [Op.gte]: 15 };
    where.discount_type = "percentage";
  }
  if (category) {
    where.category_id = { [Op.in]: String(category).split(",") };
  }
  if (brand) {
    where.brand_id = { [Op.in]: String(brand).split(",") };
  }
  return where;
};
