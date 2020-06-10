import { validateRequiredStringProperty } from "../../utilities/helpers/validation";
import { User } from "./users.model";
import { generateToken } from "../../utilities/helpers/helpers";
import { validateAccountType } from "../authentication/authentication-validator";

export const validateNewUser = (request: any): User => {
  validateRequiredStringProperty("First name", request.firstName);
  validateRequiredStringProperty("Last name", request.lastName);
  validateRequiredStringProperty("Email address", request.emailAddress);
  validateAccountType(request.accountType);

  let userCode: string = generateToken(10);
  let user: User = {
    userCode: userCode,
    firstName: request.firstName,
    lastName: request.lastName,
    emailAddress: request.emailAddress.toLowerCase(),
    phoneNumber: request.phoneNumber,
    accountType: request.accountType,
  };

  return user;
};
