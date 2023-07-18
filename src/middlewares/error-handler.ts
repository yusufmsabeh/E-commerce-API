import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log("error ", error);

  response.status(500).json({
    error: true,
    status: 500,
    message: "Internal server error",
  });
};
