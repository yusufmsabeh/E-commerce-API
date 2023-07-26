import { User } from "../models/User";

export const getUserByEmail = async (email: Element) => {
  return await User.findOne({ where: { email: email } });
};

export const createUser = async (user: UserAttributes) => {
  return await User.create({ ...user });
};

interface UserAttributes {
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
  date_of_birth: Date;
  password: string;
}
