import { ZonalCommand } from "./zonal-command.model";
import { createValidatedZonalCommand } from "./zonal-command-validator";
import { zonalCommandNameExists, createZonalcommand, getZonalCommands, getSingleZonalCommand } from "./zonal-command-data-access";
import logger from "../../utilities/helpers/logger";

/**
 * Create nw zonal command
 */
export const userCreatesZonalCommand = async (commandRequest: any): Promise<string> => {
  try {
    let zonalCommand: ZonalCommand = createValidatedZonalCommand(commandRequest);

    if (zonalCommandNameExists(zonalCommand.zonalCommandName)) {
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

    if (zonalCommandNameExists(zonalCommand.zonalCommandName)) {
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
export const userGetSingleZonalCommand = async (zonalCommandCode: string): Promise<any> => {
  try {
    return await getSingleZonalCommand(zonalCommandCode);
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};
