import { Request, Response } from "express";
import { adaptExpressRequest, AppAdaptedRequest } from "../../utilities/helpers/helpers";
import logger from "../../utilities/helpers/logger";
import { getStatusCodeFromException } from "../../utilities/responses/responses";
import { userGetsAllUsers, systemOrUserCreatesUser } from "./users-use-cases";

import { User } from "./users.model";

export const createUser = async (req: Request, res: Response) => {
  try {
    let request = adaptExpressRequest(req);
    let userCode: string = await systemOrUserCreatesUser(request.body, request.user);
    res.status(201).json({ userCode: userCode });
    // res.status(response?.statusCode).json(response.data);
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    let request: AppAdaptedRequest = adaptExpressRequest(req);
    let filterParams = request.queryParams;
    let users: User[] = await userGetsAllUsers(filterParams.pagesize, filterParams.pagenumber, filterParams.order);
    res.status(200).json(users);
  } catch (error) {
    logger.error(error.message);
    let messageText = error.message || "Sorry: Unable to process request";
    let message = { message: messageText };
    res.status(getStatusCodeFromException(error)).json(message);
  }
};
