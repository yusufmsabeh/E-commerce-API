import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../errors/validation";
import { GeneralError } from "../errors/general-error";

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let status = 500;
  let message: any = "Internal server error";
  if (error instanceof ValidationError) {
    status = error.status;
    message = error.error;
  } else if (error instanceof GeneralError) {
    status = error.status;
    message = error.message;
  }
  console.log("error ", error);
  response.status(500).json({
    error: true,
    status: status,
    message: message,
  });
};
