import { Request, Response, NextFunction, RequestHandler } from "express";

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
