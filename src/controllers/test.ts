import { Request, Response, NextFunction, RequestHandler } from "express";
import { User } from "../models/User";

export const getTest: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.status(200).json({
    statusCode: 200,
    message: "received successfully ",
  });
};

export const getPrivateRoute: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user = request.user as User;
  response.status(200).json({ message: "you are logged in", user: user });
};
