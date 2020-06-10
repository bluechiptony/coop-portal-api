import { DatabaseError, InvalidDataTypeError, RequiredPropertyError } from "../errors/errors";

export const makeHttpErrorFromException = (exception: Error, message?: string): AppResponse => {
  let statusCode = getStatusCodeFromException(exception);
  message = exception.message;
  if (message != null || message != undefined) {
    message = message;
  }

  let response: AppResponse = {
    statusCode: statusCode,
    data: message,
  };

  return response;
};

export const makeHttpResponse = (statusCode: number, data: any): AppResponse => {
  return {
    statusCode: statusCode,
    data: data,
  };
};

export const createMessageResponse = (message: string) => {
  return {
    message: message,
  };
};

export const getStatusCodeFromException = (e: Error): number => {
  let statusCode = 500;

  if (e instanceof DatabaseError) {
    statusCode = 500;
  } else if (e instanceof InvalidDataTypeError || e instanceof RequiredPropertyError) {
    statusCode = 400;
  }

  return statusCode;
};

export interface AppResponse {
  statusCode: number;
  data: any;
}
