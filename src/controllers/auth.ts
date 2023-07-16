import { NextFunction, Request, RequestHandler } from "express";
import { hash } from "bcrypt";
import { User } from "../models/User";
export const signup: RequestHandler = async (request, response, next) => {
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
