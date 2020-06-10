import { AuthenticatedUser, UserToken } from "../../handlers/authentication/authentication.model";
import * as bcrypt from "bcrypt";
import { User } from "../../handlers/users/users.model";
import * as jsonwebtoken from "jsonwebtoken";

let saltRounds = 1;

export const generateHashforPasswordText = async (password: string): Promise<string> => {
  let hashPassword;
  try {
    hashPassword = await bcrypt.hashSync(password, saltRounds);
    return hashPassword;
  } catch (error) {
    throw new Error(`Unable to complete hash process`);
  }
};

export const comparePassword = async (passwordText: string, hash?: string): Promise<boolean> => {
  if (hash != null) {
    try {
      return await bcrypt.compareSync(passwordText, hash);
    } catch (error) {
      console.log(error);
      throw new Error(`Unable to complete hash comparison`);
    }
  } else {
    return false;
  }
};

export const createAuthTokenForUser = async (user: User): Promise<UserToken> => {
  const authKey: any = process.env.AUTH_SK;
  try {
    return { token: jsonwebtoken.sign(user, authKey) };
  } catch (error) {
    throw new Error(error);
  }
};

export const generateTokenForAuthenticatedUser = (authenticatedUser: AuthenticatedUser) => {};

export const checkIfTokenIsValidForUser = (token: string) => {};
