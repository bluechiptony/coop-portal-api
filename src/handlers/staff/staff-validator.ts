import { Staff, StaffEmploymentDetails } from "./staff.model";
import { validateRequiredStringProperty, validatePhoneNumber, validateRequiredNumericProperty } from "../../utilities/helpers/validation";
import { generateToken } from "../../utilities/helpers/helpers";

/**
 * Validates staff details
 * @param request
 */
export const validateStaffDetails = (request: any): Staff => {
  validateRequiredStringProperty("First name", request.firstName);
  validateRequiredStringProperty("Last name", request.lastName);
  validateRequiredStringProperty("Email address", request.emailAddress);
  validateRequiredNumericProperty("State of origin", request.stateOfOrifin);
  validateRequiredNumericProperty("Lga of origin", request.lgaOfOrigin);
  validateRequiredNumericProperty("Nationality", request.nationality);

  if (request.phonenUmber) {
    validatePhoneNumber(request.phoneNumber);
  }

  return {
    userCode: request.userCode || generateToken(8).toUpperCase(),
    staffCode: request.staffCode || generateToken(8).toUpperCase(),
    firstName: request.firstName,
    middleName: request.middleName,
    lastName: request.lastName,
    dob: request.dob,
    nationality: request.nationality,
    stateOfOrigin: request.stateOfOrigin,
    lgaOfOrigin: request.lgaOfOrigin,
    phoneNumber: request.phoneNumber,
    emailAddress: request.emailAddress,
  };
};

/**
 * Validates employment details
 * @param request
 */
export const validateEmploymentDetails = (request: any): StaffEmploymentDetails => {
  validateRequiredStringProperty("Staff code", request.staffCode);
  validateRequiredStringProperty("Zonal command", request.zonalCommand);
  validateRequiredStringProperty("Staff number", request.staffNumber);
  validateRequiredStringProperty("Department", request.department);
  validateRequiredStringProperty("Request", request.designation);
  validateRequiredStringProperty("Grade Level", request.gradeLevel);
  validateRequiredStringProperty("Salary Step", request.step);

  validateRequiredStringProperty("Employment date", request.employedDate);

  return {
    userCode: request.userCode,
    staffCode: request.staffCode,
    staffNumber: request.staffNumber,
    zonalCommand: request.zonalCommand,
    department: request.department,
    designation: request.designation,
    gradeLevel: request.gradeLevel,
    step: request.step,
    unit: request.unit,
    employedDate: request.employedDate,
    statutoryRetirementDate: request.statutoryRetirementDate,
    serviceRetirementDate: request.serviceRetirementDate,
  };
};
