import { Request, Response, NextFunction } from "express";
import { adaptExpressRequest, AppAdaptedRequest } from "../../utilities/helpers/helpers";
import logger from "../../utilities/helpers/logger";
import { getStatusCodeFromException } from "../../utilities/responses/responses";
import { getAllStates, getAllLGAsForState, getAllLgas, getAllCountries } from "./locale-use-cases";

export const getStates = async (req: Request, res: Response) => {
  try {
    let states = await getAllStates();
    res.status(200).json(states);
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};
export const getLgasForState = async (req: Request, res: Response) => {
  try {
    let adaptedRequest: AppAdaptedRequest = adaptExpressRequest(req);
    let lgas = await getAllLGAsForState(adaptedRequest.pathParams.state);
    res.status(200).json(lgas);
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};
export const getLgas = async (req: Request, res: Response) => {
  try {
    let lgas = await getAllLgas();
    res.status(200).json(lgas);
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};
export const getCountries = async (req: Request, res: Response) => {
  try {
    let lgas = await getAllCountries();
    res.status(200).json(lgas);
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};
