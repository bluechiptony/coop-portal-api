import { Staff, StaffEmploymentDetails, AccountAssignment } from "./staff.model";
import { validateRequiredStringProperty, validatePhoneNumber, validateRequiredNumericProperty, validateRequiredProperty, validateEmailAddress } from "../../utilities/helpers/validation";
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
  validateRequiredStringProperty("Gender", request.gender);
  validateRequiredProperty("Gender", request.gender);

  if (request.phonenUmber) {
    validatePhoneNumber(request.phoneNumber);
  }

  validateEmailAddress(request.emailAddress);

  let staffCode;
  if (!request.userCode) {
    staffCode = generateToken(8).toUpperCase();
  }

  return {
    userCode: request.userCode || staffCode,
    staffCode: request.userCode || staffCode,
    firstName: request.firstName,
    middleName: request.middleName,
    lastName: request.lastName,
    dob: request.dob,
    gender: request.gender,
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

export const validateStaffAssignment = (request: any): AccountAssignment => {
  validateRequiredStringProperty("Department", request.departmentCode);
  validateRequiredStringProperty("Zonal command", request.zonalCommandCode);
  validateRequiredStringProperty("User code", request.userCode);

  return {
    departmentCode: request.departmentCode,
    zonalCommandCode: request.zonalCommandCode,
    userCode: request.userCode,
  };
};
