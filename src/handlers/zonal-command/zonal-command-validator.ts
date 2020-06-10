import { ZonalCommand } from "./zonal-command.model";
import { validateRequiredStringProperty } from "../../utilities/helpers/validation";
import { generateToken } from "../../utilities/helpers/helpers";

export const createValidatedZonalCommand = (request: any): ZonalCommand => {
  validateRequiredStringProperty("Zone name", request.zoneCode);

  return {
    zoneName: request.zoneName,
    zoneCode: request.zoneCode || generateToken(8),
  };
};
