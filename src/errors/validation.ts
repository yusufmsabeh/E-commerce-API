import {Error} from "sequelize";
import Joi from "joi";

export class ValidationError extends Error{
  error!:Joi.ValidationErrorItem[];
  status!:number;
  constructor(message:string,error:Joi.ValidationErrorItem[]) {
    super(message);
    this.error=error;
    this.status=422;
  }
}