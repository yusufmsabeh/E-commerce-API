import { Address } from "../models/Address";

export const getAddressById = async (
  addressId: string
): Promise<Address | null> => {
  return await Address.findByPk(addressId);
};

export const createAddress = async (address: any): Promise<Address | null> => {
  return await Address.create({ ...address, user_id: null });
};
