import { ZonalCommand, UnitRequest } from "./zonal-command.model";
import { createValidatedZonalCommand, validateUnitRequest } from "./zonal-command-validator";
import { zonalCommandNameExists, createZonalcommand, getZonalCommands, getSingleZonalCommand, unitExists, createUnitForZonalCommand, getUnitsForZonalCommand } from "./zonal-command-data-access";
import logger from "../../utilities/helpers/logger";

/**
 * Create nw zonal command
 */
export const userCreatesZonalCommand = async (commandRequest: any): Promise<string> => {
  try {
    let zonalCommand: ZonalCommand = createValidatedZonalCommand(commandRequest);

    console.log(zonalCommand);

    if (await zonalCommandNameExists(zonalCommand.zonalCommandName)) {
      throw new Error("Zonal command name already exists");
    }

    let zonalCommandCode: string = await createZonalcommand(zonalCommand);
    return zonalCommandCode;
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

/**
 * Update existing zonal command = as
 */
export const updateZonalCommand = async (commandRequest: any): Promise<string> => {
  try {
    let zonalCommand: ZonalCommand = createValidatedZonalCommand(commandRequest);

    if (!(await zonalCommandNameExists(zonalCommand.zonalCommandName))) {
      throw new Error("Zonal command doesn't already exists");
    }

    let zonalCommandCode: string = await createZonalcommand(zonalCommand);
    return zonalCommandCode;
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

/**
 * Create nw zonal command
 */
export const userCreatesUnitForZonalCommand = async (commandRequest: any): Promise<string> => {
  try {
    let unitRequest: UnitRequest = validateUnitRequest(commandRequest);

    if (await unitExists(unitRequest.zonalCommandCode, unitRequest.departmentCode)) {
      throw new Error("Unit already exists");
    }

    let zonalCommandCode: string = await createUnitForZonalCommand(unitRequest.zonalCommandCode, unitRequest.departmentCode);
    return zonalCommandCode;
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

/**
 * Change zonal command's status
 */
export const changeZonalCommandStatus = async (): Promise<string> => {
  return "";
};

/**
 * Get zonal commands
 */
export const userGetsZonalCommands = async (pageSize?: number, pageNumber?: number): Promise<any[]> => {
  try {
    return await getZonalCommands(pageSize, pageNumber);
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

/**
 * Get Single zonal command
 */
export const userGetsSingleZonalCommand = async (zonalCommandCode: string): Promise<any> => {
  try {
    return await getSingleZonalCommand(zonalCommandCode);
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

/**
 * Get units zonal command
 */
export const userGetsUnitsForZonalCommand = async (zonalCommandCode: string): Promise<any> => {
  try {
    return await getUnitsForZonalCommand(zonalCommandCode);
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};
