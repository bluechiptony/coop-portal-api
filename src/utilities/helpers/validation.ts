import { isValidEmail, isValidPhoneNumber } from "./helpers";
import { InvalidDataTypeError, RequiredPropertyError } from "../errors/errors";

export const validateRequiredStringProperty = (label: string, property: any) => {
  if (property == null || property == undefined || property == "undefined") {
    throw new RequiredPropertyError(`${label} must be provided`);
  }
  if (typeof property != "string") {
    throw new InvalidDataTypeError(`${label} is of an invalid data type`);
  }
};

export const validateRequiredProperty = (label: string, property: any) => {
  if (property == null || property == undefined || property == "undefined") {
    throw new RequiredPropertyError(`${label} must be provided`);
  }
};
export const validateRequiredDateProperty = (label: string, property: any) => {
  let regEx = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (property == null || property == undefined || property == "undefined") {
    throw new RequiredPropertyError(`${label} must be provided`);
  }

  // console.log(new Date(property));
  // console.log(property);

  if (!(new Date(property) instanceof Date)) {
    throw new InvalidDataTypeError(`${label} is of an invalid date format`);
  }
};

export const validateRequiredNumericProperty = (label: string, property: any) => {
  let newProp = +property;

  if (Number.isNaN(newProp) && property !== undefined) {
    throw new InvalidDataTypeError(`${label} is of an invalid data type`);
  }

  if (property == null || property == undefined || property == "undefined") {
    throw new RequiredPropertyError(`${label} must be provided`);
  }

  if (typeof property !== "number" && isNaN(property)) {
    throw new InvalidDataTypeError(`${label} is of an invalid data type`);
  }
};

export const validateIfArray = (label: string, arrayProspect: any) => {
  if (arrayProspect == null || arrayProspect == undefined || arrayProspect == "undefined") {
    throw new RequiredPropertyError(`${label} must be provided`);
  } else {
    if (!(Array.isArray(arrayProspect) && arrayProspect.length > 0)) {
      throw new RequiredPropertyError(`${label} must be provided`);
    }
  }
};

export const validateEmailAddress = (email: string): void => {
  if (!isValidEmail(email)) {
    throw new Error("Invalid email address");
  }
};

export const validatePhoneNumber = (phone: string): void => {
  if (!isValidPhoneNumber(phone)) {
    throw new Error("Invalid phone number");
  }
};
