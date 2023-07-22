import Joi, { string } from "joi";
import { RequestHandler, Request, Response, NextFunction } from "express";

const getProductSchema: Joi.ObjectSchema = Joi.object({
  type: Joi.string().lowercase().trim(),
});

export const getProductSanitizer: RequestHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  request.query = getProductSchema.validate(request.query, {
    allowUnknown: true,
    convert:true
  }).value;
  next();
};
