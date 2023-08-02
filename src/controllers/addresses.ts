import { RequestHandler, Request, Response, NextFunction } from "express";
import { postAddressValidator } from "../validators/post-address-validator";
import { User } from "../models/User";
import { Address } from "../models/Address";
import * as addressServices from "../services/address";

export const postAddress: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    postAddressValidator(request.body);
    const { firstName, lastName, countryCode, mobile, location } = request.body;
    const user = request.user as User;
    const addressValues = {
      first_name: firstName,
      last_name: lastName,
      country_code: countryCode,
      mobile: mobile,
      location: location,
    };
    let address ;
    if (user)
      address = await user.$create<Address>("address", addressValues);
    else
      address = await addressServices.createAddress(addressValues);
    return response.status(200).json({
      error: false,
      status: 200,
      data: {
        message: "Address Add successfully",
        address: address,
      },
    });
  } catch (e) {
    next(e);
  }
};

export const getAddresses: RequestHandler = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const user = request.user as User;
    const addresses = await user.$get("addresses");
    response.status(200).json({
      error: false,
      status: 200,
      data: {
        addresses: addresses,
      },
    });
  } catch (e) {
    next(e);
  }
};
