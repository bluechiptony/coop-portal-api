import { AppAdaptedRequest, generateToken } from "../../utilities/helpers/helpers";
import { LoginRequest, AuthenticationProfile, UserToken, AuthenticatedUser, AccountTypes, PasswordChangeRequest } from "./authentication.model";
import { validateUserLoginRequest, validateAccountRequest, validatePasswordChangeRequest } from "./authentication-validator";
import { makeHttpErrorFromException, AppResponse, makeHttpResponse, createMessageResponse } from "../../utilities/responses/responses";
import { getAuthenticationProfileViaEmail, checkIfTokenIsValidForUserEmail, checkIfAuthenticationProfileExists, getAccountTypes, createAuthenticationProfile, updateProfileForPasswordRequest, checkIfTokenIsValid, updateAuthProfilePassword } from "./authentication-data-access";
import { comparePassword, createAuthTokenForUser, generateHashforPasswordText } from "../../utilities/helpers/authentication";
import { getSingleUser } from "../users/users-data-access";
import { User } from "../users/users.model";
import logger from "../../utilities/helpers/logger";
import { sendAccountActivationMessage, sendPasswordRecoveyMessage } from "../../utilities/messaging/messaging";

export const systemPerformsUserLogin = async (request: AppAdaptedRequest): Promise<AppResponse> => {
  let loginRequest: LoginRequest;
  let authenticationProfile: AuthenticationProfile;
  try {
    loginRequest = await validateUserLoginRequest(request.body);
    authenticationProfile = await getAuthenticationProfileViaEmail(loginRequest.emailAddress.toLowerCase());

    let valid = await comparePassword(loginRequest.password, authenticationProfile.password);
    if (!valid) {
      throw new Error("Invalid username/ password");
    }
    let user: User = await getSingleUser(authenticationProfile.userCode);
    let token: UserToken = await createAuthTokenForUser(user);

    return makeHttpResponse(200, token.token);
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

export const userCreatesAuthenticationProfile = async (request: AppAdaptedRequest): Promise<AppResponse> => {
  try {
    let authProfile: AuthenticationProfile = await validateAccountRequest(request.body);

    if (await checkIfAuthenticationProfileExists(authProfile.emailAddress)) {
      throw new Error("Authentication profile already exists");
    }

    let saveResult = await createAuthenticationProfile(authProfile);

    if (authProfile.verificationCode != undefined) {
      sendAccountActivationMessage(authProfile.emailAddress, authProfile.verificationCode, true);
    }

    return makeHttpResponse(201, createMessageResponse("User account successfully created"));
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

export const userMakesForgotPasswordRequest = async (request: AppAdaptedRequest) => {
  try {
    if (!request.body.emailAddress) {
      throw new Error("Please provide an email address");
    }

    if (!(await checkIfAuthenticationProfileExists(request.body.emailAddress))) {
      throw new Error("Email address doesn not exist on our system");
    }

    let token: string = generateToken(256);

    let result = await updateProfileForPasswordRequest(request.body.emailAddress, token);
    console.log(result);
    if (result != undefined) {
      sendPasswordRecoveyMessage(request.body.emailAddress, token, true);
    }
    return makeHttpResponse(200, createMessageResponse(`Password recovery email sent to ${request.body.emailAddress}`));
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

export const userSetsPassword = async (request: AppAdaptedRequest) => {
  try {
    let passwordRequest: PasswordChangeRequest = await validatePasswordChangeRequest(request.body);

    if (!(await checkIfTokenIsValid(passwordRequest.token))) {
      throw new Error("Unfortunately request token is expired");
    }

    let hashedPassword = await generateHashforPasswordText(passwordRequest.password);
    let result = await updateAuthProfilePassword(hashedPassword, passwordRequest.token);

    return makeHttpResponse(200, createMessageResponse("Account successfully activated"));
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

export const userResetsPassword = async (request: AppAdaptedRequest) => {
  try {
    let passwordRequest: PasswordChangeRequest = await validatePasswordChangeRequest(request.body);

    if (!(await checkIfTokenIsValid(passwordRequest.token))) {
      throw new Error("Unfortunately request token is expired");
    }

    let hashedPassword = await generateHashforPasswordText(passwordRequest.password);
    let result = await updateAuthProfilePassword(hashedPassword, passwordRequest.token);

    return makeHttpResponse(200, createMessageResponse("Password was successfully changed"));
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

export const userGetsAccountTypes = async (request: AppAdaptedRequest) => {
  try {
    let accountTypes = await getAccountTypes();
    return makeHttpResponse(200, accountTypes);
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};
