import {Address} from "../models/Address";

export const getAddressById = async (addressId: string): Promise<Address | null> => {
  return await Address.findByPk(addressId);
};
