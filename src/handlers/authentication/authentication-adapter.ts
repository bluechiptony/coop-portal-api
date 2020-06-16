import { Request, Response, NextFunction } from "express";
import { adaptExpressRequest } from "../../utilities/helpers/helpers";
import logger from "../../utilities/helpers/logger";
import { systemPerformsUserLogin, userGetsAccountTypes, userCreatesAuthenticationProfile, userMakesForgotPasswordRequest, userSetsPassword, userResetsPassword } from "./authentication-use-cases";
import { getStatusCodeFromException } from "../../utilities/responses/responses";

export const login = async (req: Request, res: Response) => {
  try {
    let request = adaptExpressRequest(req);
    logger.info(`Login attempt: ${request.body.emailAddress}`);

    let response = await systemPerformsUserLogin(request);

    res.status(response?.statusCode).json(response.data);
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};

export const getAccountTypes = async (req: Request, res: Response) => {
  try {
    let request = adaptExpressRequest(req);
    let response = await userGetsAccountTypes(request);
    res.status(response?.statusCode).json(response.data);
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};

export const getLoggedInUser = async (req: Request, res: Response) => {};

export const activateAccount = async (req: Request, res: Response) => {
  try {
    let request = adaptExpressRequest(req);
    let response = await userSetsPassword(request);
    res.status(response?.statusCode).json(response.data);
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    let request = adaptExpressRequest(req);
    let response = await userResetsPassword(request);
    res.status(response?.statusCode).json(response.data);
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};

export const resendActivationRequest = async (req: Request, res: Response) => {};

export const recoverAccount = async (req: Request, res: Response) => {
  try {
    let request = adaptExpressRequest(req);
    let response = await userMakesForgotPasswordRequest(request);
    res.status(response?.statusCode).json(response.data);
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};

export const createAuthenticationProfile = async (req: Request, res: Response) => {
  try {
    let request = adaptExpressRequest(req);
    let response = await userCreatesAuthenticationProfile(request);
    res.status(201).json({ message: "Profile successfully created", userCode: response });
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};

export const changeAccountStatus = async (req: Response, res: Response) => {};
