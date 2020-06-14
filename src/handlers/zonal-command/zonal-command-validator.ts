import { ZonalCommand } from "./zonal-command.model";
import { validateRequiredStringProperty, validateRequiredProperty } from "../../utilities/helpers/validation";
import { generateToken } from "../../utilities/helpers/helpers";

export const createValidatedZonalCommand = (request: any): ZonalCommand => {
  validateRequiredStringProperty("Zone name", request.zonalCommandName);
  validateRequiredProperty("Zone name", request.active);

  return {
    zonalCommandName: request.zonalCommandName,
    active: request.active,
    zonalCommandCode: request.zonalCommandCode || generateToken(8).toUpperCase(),
  };
};
