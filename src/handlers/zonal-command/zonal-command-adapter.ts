import { Request, Response } from "express";
import { adaptExpressRequest, AppAdaptedRequest } from "../../utilities/helpers/helpers";
import logger from "../../utilities/helpers/logger";
import { getStatusCodeFromException } from "../../utilities/responses/responses";
import { userGetsZonalCommands, userCreatesZonalCommand, userGetsSingleZonalCommand, userCreatesUnitForZonalCommand, userGetsUnitsForZonalCommand } from "./zonal-command-use-cases";

export const getZonalCommands = async (req: Request, res: Response) => {
  try {
    let request = adaptExpressRequest(req);
    logger.info(`Login attempt: ${request.body.emailAddress}`);

    let response = await userGetsZonalCommands();

    res.status(200).json(response);
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};

export const createZonalCommand = async (req: Request, res: Response) => {
  try {
    let request = adaptExpressRequest(req);
    let response = await userCreatesZonalCommand(request.body);
    res.status(201).json({ message: response, zonalCommandCode: response });
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};

export const createUnitForZonalCommand = async (req: Request, res: Response) => {
  try {
    let request = adaptExpressRequest(req);
    let response = await userCreatesUnitForZonalCommand(request.body);
    res.status(201).json({ message: "Unit created sucessfully", unitCode: response });
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};

export const getZonalCommand = async (req: Request, res: Response) => {
  try {
    let request = adaptExpressRequest(req);
    let response = await userGetsSingleZonalCommand(request.pathParams.zonalcommand);
    res.status(201).json(response);
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};
export const getUnitsForZonalCommand = async (req: Request, res: Response) => {
  try {
    let request = adaptExpressRequest(req);
    let response = await userGetsUnitsForZonalCommand(request.pathParams.zonalcommand);
    res.status(201).json(response);
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};
export const getZonalCommandHead = async (req: Request, res: Response) => {
  try {
    let request = adaptExpressRequest(req);
    let response = await userGetsUnitsForZonalCommand(request.pathParams.zonalcommand);
    res.status(201).json(response);
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};
export const setZonalCommandHead = async (req: Request, res: Response) => {
  try {
    let request = adaptExpressRequest(req);
    let response = await userGetsUnitsForZonalCommand(request.pathParams.zonalcommand);
    res.status(201).json(response);
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};
