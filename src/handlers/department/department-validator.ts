import { validateRequiredStringProperty } from "../../utilities/helpers/validation";
import { convertToNameCase, generateToken } from "../../utilities/helpers/helpers";
import { departmentExists } from "./department-data-access";

export const validateDepartment = (request: any) => {
  validateRequiredStringProperty("Department name", request.departmentName);
  return {
    departmentName: convertToNameCase(request.departmentName),
    departmentCode: request.departmentCode || generateToken(8).toUpperCase(),
  };
};

export const validateDepartmentUnit = () => {};
