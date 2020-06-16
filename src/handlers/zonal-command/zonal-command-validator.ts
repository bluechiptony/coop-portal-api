import { ZonalCommand } from "./zonal-command.model";
import { validateRequiredStringProperty, validateRequiredProperty } from "../../utilities/helpers/validation";
import { generateToken } from "../../utilities/helpers/helpers";

export const createValidatedZonalCommand = (request: any): ZonalCommand => {
  validateRequiredStringProperty("Zone name", request.zonalCommandName);
  validateRequiredProperty("Zone name", request.active);
  validateRequiredProperty("statee", request.state);
  validateRequiredProperty("Local government", request.lga);

  return {
    zonalCommandName: request.zonalCommandName,
    active: request.active,
    zonalCommandCode: request.zonalCommandCode || generateToken(8).toUpperCase(),
    state: request.state,
    lga: request.lga,
  };
};

export const validateUnitRequest = (request: any) => {
  validateRequiredStringProperty("Zonal command", request.zonalCommandCode);
  validateRequiredStringProperty("Department ", request.departmentCode);

  return {
    zonalCommandCode: request.zonalCommandCode,
    departmentCode: request.departmentCode,
  };
};
