import * as knex from "knex";
import { Connection } from "../../config/database";
import { DatabaseError } from "../../utilities/errors/errors";
import { sanitize, generateToken } from "../../utilities/helpers/helpers";
import logger from "../../utilities/helpers/logger";
import { ZonalCommand } from "./zonal-command.model";
import { StaffContact } from "../staff/staff.model";

const connector: knex = new Connection().knex();

const zonalCommandTable: string = "zonal_commands";
const zonalCommandUnitsTable: string = "command_units";
const zonalCommandHeadsTable: string = "command_heads";
const unitTable: string = "units";

export const createZonalcommand = async (command: ZonalCommand, creator?: string): Promise<string> => {
  try {
    let result: any = await connector
      .table(zonalCommandTable)
      .insert({
        zonal_command_code: command.zonalCommandCode,
        zonal_command_name: command.zonalCommandName,
        active: command.active,
        state: command.state,
        lga: command.lga,
        created_date: new Date(),
        updated_date: new Date(),
        created_by: creator,
        updated_by: creator,
      })
      .returning("zonal_command_code");
    return result[0];
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

export const createUnitForZonalCommand = async (zonalCommandCode: string, departmentCode: string, creator?: string): Promise<string> => {
  try {
    let result: any = await connector
      .table(unitTable)
      .insert({
        unit_code: generateToken(8).toUpperCase(),
        zonal_command_code: zonalCommandCode,
        department_code: departmentCode,
        created_date: new Date(),
        updated_date: new Date(),
        active: true,
        created_by: creator,
        updated_by: creator,
      })
      .returning("unit_code");
    return result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getUnitViaDepartment = async (zonalCommandCode: string, departmentCode: string) => {
  try {
    let result: any = await connector.table(unitTable).select("*").where({ zonal_command_code: zonalCommandCode, department_code: departmentCode });

    if (result.length > 0) {
      return sanitize(result[0]);
    } else {
      return {};
    }
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getZonalCommands = async (pageNumber?: number, pageSize?: number): Promise<any[]> => {
  try {
    let result: any = await connector.table(zonalCommandTable).select("*").innerJoin("states", { "states.state_id": "zonal_commands.state" }).innerJoin("lgas", { "lgas.lga_id": "zonal_commands.lga" });
    return sanitize(result);
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getUnitsForZonalCommand = async (commandCode: string): Promise<any[]> => {
  try {
    let result: any = await connector.table(unitTable).select("*").where({ zonal_command_code: commandCode }).innerJoin("departments", { "departments.department_code": "units.department_code" });

    return sanitize(result);
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getSingleZonalCommand = async (commandCode: string) => {
  try {
    let result: any = await connector.table(zonalCommandTable).select("*").where({ zonal_command_code: commandCode }).innerJoin("states", { "states.state_id": "zonal_commands.state" }).innerJoin("lgas", { "lgas.lga_id": "zonal_commands.lga" });

    if (result.length > 0) {
      return sanitize(result[0]);
    } else {
      return {};
    }
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getZonalCommandHead = async (commandCode: string) => {
  try {
    let result: any = await connector.table(zonalCommandHeadsTable).select("*").where({ zonal_command_code: commandCode });
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const zonalCommandNameExists = async (zonalCommandName: string): Promise<boolean> => {
  try {
    let result: any = await connector.table(zonalCommandTable).count("zonal_command_name").where({ zonal_command_name: zonalCommandName });
    return result[0].count > 0 ? true : false;
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};
export const unitExists = async (zonalCommandCode: string, departmentCode: string): Promise<boolean> => {
  try {
    let result: any = await connector.table(unitTable).count("department_code").where({ department_code: departmentCode, zonal_command_code: zonalCommandCode });
    return result[0].count > 0 ? true : false;
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};
export const hasZonalCommander = async (zonalCommandCode: string): Promise<boolean> => {
  try {
    let result: any = await connector.table(zonalCommandHeadsTable).count("zonal_command_code").where({ zonal_command_code: zonalCommandCode });
    return result[0].count > 0 ? true : false;
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const zonalCommandExists = async (zonalCommandCode: string, zonalCommandName: string): Promise<boolean> => {
  return true;
};
