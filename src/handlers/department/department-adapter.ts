import { Request, Response } from "express";
import { adaptExpressRequest, AppAdaptedRequest } from "../../utilities/helpers/helpers";
import logger from "../../utilities/helpers/logger";
import { getStatusCodeFromException } from "../../utilities/responses/responses";
import { userCreatesDepartment, userGetsDepartments } from "./department-use-cases";

export const getDepartments = async (req: Request, res: Response) => {
  try {
    let request = adaptExpressRequest(req);
    logger.info(`Login attempt: ${request.body.emailAddress}`);

    let response = await userGetsDepartments();

    res.status(200).json(response);
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};

export const createDepartment = async (req: Request, res: Response) => {
  try {
    let request = adaptExpressRequest(req);
    let response = await userCreatesDepartment(request.body);
    res.status(201).json({ message: response, departmentCode: response });
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};
