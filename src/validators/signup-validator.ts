import Joi, { date, string } from "joi";
import { ValidationError } from "../errors/validation";
import { User } from "../models/User";
const signupSchema = Joi.object({
  firstName: Joi.string().min(5).max(20).required().label("first name"),
  lastName: Joi.string().min(5).max(20).required().label("last name"),
  mobile: Joi.string().length(10).required().label("mobile"),
  email: Joi.string().email().required().label("email"),
  dateOfBirth: Joi.date().required().label("date of birth"),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .label("password")
    .messages({
      "string.pattern.base":
        "weak password:\n" +
        "It must contain at least one lowercase letter.\n" +
        "It must contain at least one digit.\n" +
        "It must contain at least one special character from the given set.\n" +
        "It must be at least 8 characters long.",
    }),
});

export const signupValidator = (signupInput: SignupInput) => {
  const { error } = signupSchema.validate(signupInput);
  if (error) throw new ValidationError("invalid inputs", error.details);
};

interface SignupInput {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  dateOfBirth: string;
  password: string;
}
