import Joi, { string } from "joi";
import { ValidationError } from "../errors/validation";

const postAddressSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  countryCode: Joi.string()
    .max(4)
    .custom((countryCode: string, helpers) => {
      if (countryCode[0] !== "+") return helpers.error("any.invalidStart");
      return countryCode;
    })
    .messages({
      "any.invalidStart": "Country code should start with +",
    }).required(),
  mobile: Joi.string().length(10).required(),
});

export const postAddressValidator = (postAddressInput: any) => {
  const { error } = postAddressSchema.validate(postAddressInput ?? {}, {
    allowUnknown: true,
    abortEarly: false,
  });
  if (error) throw new ValidationError("invalid input", error.details);
};
