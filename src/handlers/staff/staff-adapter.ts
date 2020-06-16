import { Request, Response } from "express";
import { adaptExpressRequest, AppAdaptedRequest } from "../../utilities/helpers/helpers";
import logger from "../../utilities/helpers/logger";
import { getStatusCodeFromException } from "../../utilities/responses/responses";
import { userCreatesStaff, userGetsStaffList, userGetsSingeStaffWithUsercode, performInitalStaffAssignment, userGetsStaffEmploymentetails, userCreatesStaffEmploymentDetails } from "./staff-use-cases";

export const getStaffList = async (req: Request, res: Response) => {
  try {
    let request = adaptExpressRequest(req);
    let response = await userGetsStaffList();
    res.status(200).json(response);
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};

export const getStaffDetailList = async (req: Request, res: Response) => {
  try {
    let request = adaptExpressRequest(req);

    let response = await userGetsStaffList();

    res.status(200).json(response);
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};

export const getStaffDetailsWithUserCode = async (req: Request, res: Response) => {
  try {
    let request = adaptExpressRequest(req);
    let response = await userGetsSingeStaffWithUsercode(request.pathParams.usercode);
    res.status(200).json(response);
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};
export const getStaffEmploymentWithUserCode = async (req: Request, res: Response) => {
  try {
    let request = adaptExpressRequest(req);
    let response = await userGetsStaffEmploymentetails(request.pathParams.usercode);
    res.status(200).json(response);
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};

export const createStaffDetails = async (req: Request, res: Response) => {
  try {
    let request = adaptExpressRequest(req);
    let response = await userCreatesStaff(request.body);
    res.status(201).json({ message: "Details updated successfully", staffCode: response });
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};

export const createStaffEmploymentDetails = async (req: Request, res: Response) => {
  try {
    let request = adaptExpressRequest(req);
    let response = await userCreatesStaffEmploymentDetails(request.body);
    res.status(201).json({ message: "Employment Details updated successfully", staffCode: response });
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};

export const performStaffAssignment = async (req: Request, res: Response) => {
  try {
    let request = adaptExpressRequest(req);
    performInitalStaffAssignment(request.body);
    res.status(200).json({ message: "Staff assignment request recieved" });
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};
