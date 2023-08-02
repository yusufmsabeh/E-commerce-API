import { RequestHandler, Request, Response, NextFunction } from "express";
import passport from "passport";
import { User } from "../models/User";

export const authorizationMiddleware: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    passport.authenticate(
      "jwt",
      { session: false },
      (err: Error, user: User, info: any) => {
        if (err) {
          return next(err);
        }
        if (user) {
          request.user = user;
        }
        return next();
      }
    )(request, response, next);
  } catch (e) {
    next(e);
  }
};
