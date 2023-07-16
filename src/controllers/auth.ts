import {NextFunction, Request, RequestHandler, Response, response} from "express";
import { hash, compareSync } from "bcrypt";
import { User } from "../models/User";
import * as jwt from "jsonwebtoken";
export const signup: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction) => {
  const { firstName, lastName, mobile, email, dateOfBirth, password } =
    request.body;
  console.log(
    "body ",
    firstName,
    lastName,
    mobile,
    email,
    dateOfBirth,
    password
  );
  const formattedDateOfBirth = new Date(dateOfBirth);
  const hashedPassword = await hash(password, 5);
  const user = new User({
    first_name: firstName,
    last_name: lastName,
    mobile: mobile,
    email: email,
    date_of_birth: formattedDateOfBirth,
    password: hashedPassword,
  });
  await user.save();
  response.status(200).json({
    error: false,
    status: 200,
    data: {
      message: "Signed up successfully",
    },
  });
};
export const login: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction) => {
  const { email, password } = request.body;
  const user = await User.findOne({ where: { email: email } });
  if (!user)
    return response.status(404).json({
      error: true,
      status: 404,
      data: { message: "There is no user with email" },
    });

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
};
