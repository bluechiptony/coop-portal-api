import { createUser, checkIfUSerExists, getUsers, getUsersAndAccounts } from "./users-data-access";
import { AuthenticatedUser } from "../authentication/authentication.model";
import { User } from "./users.model";
import { validateNewUser } from "./users-validator";
import logger from "../../utilities/helpers/logger";

export const systemOrUserCreatesUser = async (user: any, creator?: string) => {
  try {
    let createdUser: User = validateNewUser(user);
    if (await checkIfUSerExists(createdUser.emailAddress)) {
      throw new Error("Email address already exists for another user");
    }

    let userCode: string = await createUser(createdUser, creator);
    return userCode;
  } catch (error) {
    logger.error(error.message);
    throw new Error(error.message);
  }
};

export const userGetsAllUsers = async (pageSize?: number, pageNumber?: number, dateOrder?: string) => {
  try {
    let users: any[] = await getUsersAndAccounts(pageSize, pageNumber, dateOrder);

    return users;
  } catch (error) {
    logger.error(error.message);
    throw new Error(error.message);
  }
};
