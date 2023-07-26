import { NextFunction, Request, RequestHandler, Response } from "express";
import { hash, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { signupValidator } from "../validators/signup-validator";
import { loginValidator } from "../validators/login-validator";
import { GeneralError } from "../errors/general-error";
import * as userServices from "../services/user";
export const signup: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    signupValidator(request.body);
    const { firstName, lastName, mobile, email, dateOfBirth, password } =
      request.body;
    const isExist = !!(await userServices.getUserByEmail(email));
    if (isExist) return next(new GeneralError("Email already exists", 409));
    const formattedDateOfBirth = new Date(dateOfBirth);
    const hashedPassword = await hash(password, 5);
    await userServices.createUser({
      first_name: firstName,
      last_name: lastName,
      mobile: mobile,
      email: email,
      date_of_birth: formattedDateOfBirth,
      password: hashedPassword,
    });

    response.status(200).json({
      error: false,
      status: 200,
      data: {
        message: "Signed up successfully",
      },
    });
  } catch (e) {
    next(e);
  }
};
export const login: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    loginValidator(request.body);
    const { email, password } = request.body;
    const user = await userServices.getUserByEmail(email);
    if (!user)
      return next(new GeneralError("There is no user with email", 404));

    if (!compareSync(password, user.password))
      return response.status(400).json({
        error: true,
        status: 400,
        data: { message: "password is wrong" },
      });
    const payload = {
      userId: user.id,
    };
    const secretKey = process.env.SECRET_KEY ?? "secret";
    const token: string = jwt.sign(payload, secretKey, { expiresIn: "30d" });
    response.status(200).json({
      error: false,
      status: 200,
      data: {
        user: {
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          mobile: user.mobile,
          dateOfBirth: user.date_of_birth,
          token: token,
        },
      },
    });
  } catch (e) {
    next(e);
  }
};
