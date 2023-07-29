import Joi from "joi";
import {ValidationError} from "../errors/validation";

const postAddressSchema = Joi.object({
  city: Joi.string().required(),
  street:Joi.string().required(),
  fullName:Joi.string().required(),
  pinCode:Joi.string().required(),
  state:Joi.string().required(),
  mobile:Joi.string().required()
});


export const postAddressValidator = (postAddressInput: any) => {
  const { error } = postAddressSchema.validate(postAddressInput ?? {}, {
    allowUnknown: true,
    abortEarly:false
  });
  if (error) throw new ValidationError("invalid input", error.details);
};
