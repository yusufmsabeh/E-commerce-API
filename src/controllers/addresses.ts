import {RequestHandler, Request,Response, NextFunction} from "express";
import {postAddressValidator} from "../validators/post-address-validator";
import {User} from "../models/User";
import {Address} from "../models/Address";

export const postAddress:RequestHandler = async (request:Request,response:Response,next:NextFunction)=>{
  try{
    postAddressValidator(request.body);
    const {fullName,mobile,street,city,state,pinCode} = request.body;
    const user = request.user as User;

    const address =  await user.$create<Address>("address",{
      full_name:fullName,
      mobile:mobile,
      street:street,
      city:city,
      state:state,
      pin_code:pinCode
    });

    return response.status(200).json({
      error:false,
      status:200,
      data:{
        message:"Address Add successfully",
        address:address
      }
    });
  }catch (e) {
    next(e);
  }
};