import * as knex from "knex";
import { Connection } from "../../config/database";
import { DatabaseError } from "../../utilities/errors/errors";
import { sanitize } from "../../utilities/helpers/helpers";
import logger from "../../utilities/helpers/logger";
import { ZonalCommand } from "./zonal-command.model";
import { StaffContact } from "../staff/staff.model";

const connector: knex = new Connection().knex();

const zonalCommandTable: string = "zonal_commands";
const zonalCommandUnitsTable: string = "command_units";
const zonalCommandHeadsTable: string = "command_heads";

export const createZonalcommand = async (command: ZonalCommand, creator?: string): Promise<string> => {
  try {
    let result: any = connector
      .table(zonalCommandTable)
      .insert({
        zonal_command_code: command.zonalCommandCode,
        zonal_command_name: command.zonalCommandName,
        active: command.active,
      })
      .returning("zonal_command_code");
    return await result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const updateZonalCommand = async (command: ZonalCommand, editor?: string): Promise<any> => {
  try {
    let result: any = connector
      .table(zonalCommandTable)
      .update({
        zonal_command_name: command.zonalCommandName,
        active: command.active,
      })
      .returning("zonal_command_code");
    return await result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const createZonalCommandHead = async (staffContact: StaffContact): Promise<string> => {
  try {
    let result: any = connector.table(zonalCommandTable).insert({}).returning("staff_code");
    return "";
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getZonalCommands = async (pageNumber?: number, pageSize?: number): Promise<any[]> => {
  try {
    let result: any = connector.table(zonalCommandTable).select("*");
    return await sanitize(result);
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getUnistForZonalCommand = async (commandCode: string): Promise<any[]> => {
  try {
    let result: any = connector.table(zonalCommandUnitsTable).select("*").where({ zonal_command_code: commandCode });

    return await sanitize(result);
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getSingleZonalCommand = async (commandCode: string) => {
  try {
    let result: any = connector.table(zonalCommandTable).select("*").where({ zonal_command_code: commandCode });
    return await sanitize(result[0]);
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getZonalCommandHead = async (commandCode: string) => {
  try {
    let result: any = connector.table(zonalCommandHeadsTable).select("*").where({ zonal_command_code: commandCode });
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const zonalCommandNameExists = async (zonalCommandName: string): Promise<boolean> => {
  try {
    let result: any = connector.table(zonalCommandTable).select("zonal_command_name").where({ zonal_command_name: zonalCommandName });
    return result[0].count > 0 ? true : false;
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};
export const zonalCommandExists = async (zonalCommandCode: string, zonalCommandName: string): Promise<boolean> => {
  return true;
};
