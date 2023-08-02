import Joi from "joi";
import { ValidationError } from "../errors/validation";

const postOrdersSchema: Joi.ObjectSchema = Joi.object({
  cartId: Joi.string().required(),
  transactionId: Joi.string().required(),
  addressId:Joi.string().required()
});

export const postOrdersValidator = (postOrderInput: any) => {
  const { error } = postOrdersSchema.validate(postOrderInput ?? {}, {
    abortEarly: true,
    allowUnknown: true,
  });
  if (error) throw new ValidationError("invalid input", error.details);
};
