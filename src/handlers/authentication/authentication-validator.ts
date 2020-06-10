import { validateRequiredStringProperty } from "../../utilities/helpers/validation";
import { InvalidDataTypeError } from "../../utilities/errors/errors";
import { generateToken } from "../../utilities/helpers/helpers";
import { LoginRequest, AccountTypes, AuthenticationProfile, PasswordChangeRequest } from "./authentication.model";

export const validateUserLoginRequest = (request: any): LoginRequest => {
  validateRequiredStringProperty("Email address", request.emailAddress);
  validateRequiredStringProperty("Password", request.password);

  return {
    emailAddress: request.emailAddress.toLowerCase(),
    password: request.password,
  };
};

export const validatePasswordChangeRequest = (request: any): PasswordChangeRequest => {
  validateRequiredStringProperty("Token", request.token);
  validateRequiredStringProperty("Password", request.password);

  return {
    token: request.token,
    password: request.password,
  };
};

export const validateAccountType = (accountType: string): boolean => {
  if (Object.keys(AccountTypes).includes(accountType)) {
    return true;
  } else {
    // return false;
    throw new InvalidDataTypeError("Invalid account type");
  }
};

export const validateAccountRequest = (request: any): AuthenticationProfile => {
  validateRequiredStringProperty("User code", request.userCode);
  validateRequiredStringProperty("Email address", request.emailAddress);
  validateAccountType(request.accountType);

  let authProfile: AuthenticationProfile = {
    emailAddress: request.emailAddress.toLowerCase(),
    userCode: request.userCode,
    accountType: request.accountType,
    active: false,
    verificationCode: generateToken(256),
    verificationCodeExpiry: new Date().getTime() + 84000000,
  };

  return authProfile;
};
