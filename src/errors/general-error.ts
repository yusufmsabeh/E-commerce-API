import {Error} from "sequelize";
import Joi from "joi";

export class GeneralError extends Error{
  status!:number;
  constructor(message:string,status:number) {
    super(message);
    this.status=status;
  }
}