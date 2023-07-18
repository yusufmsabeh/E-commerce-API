import Joi, { string } from "joi";
import { ValidationError } from "../errors/validation";

const loginSchema: Joi.ObjectSchema = Joi.object({
  email: Joi.string().required().email().label("email"),
  password: Joi.string()
    .required()
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
export const loginValidator = (loginInput: LoginInput) => {
  const { error, value } = loginSchema.validate(loginInput, {
    abortEarly: true,
  });
  if (error) throw new ValidationError("invalid input", error.details);
};
interface LoginInput {
  email: string;
  password: string;
}
