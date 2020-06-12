import * as knex from "knex";
import { Connection } from "../../config/database";
import { DatabaseError } from "../../utilities/errors/errors";
import { sanitize } from "../../utilities/helpers/helpers";
import logger from "../../utilities/helpers/logger";
import { Staff, StaffEmploymentDetails } from "./staff.model";

const connector: knex = new Connection().knex();

const staffTable: string = "staff";
const staffDepartmentTable: string = "staff_departments";
const staffCommandTable: string = "staff_commands";
const staffUnitTable: string = "staff_units";
const staffEmploymentTable: string = "staff_employment";

export const createStaff = async (staff: Staff): Promise<string> => {
  try {
    let result: any = await connector.table(staffTable).insert({}).returning("staff_code");

    return result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const updateStaff = async (staff: Staff): Promise<string> => {
  try {
    let result: any = await connector.table(staffTable).update({}).where({ staff_code: staff.staffCode }).returning("staff_code");

    return result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getStaff = async (pageSize?: number, pageNumber?: number): Promise<any[]> => {
  try {
    let result: any = connector.table(staffTable).select("*");

    return [];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getSingleStaff = async (staffCode: string): Promise<any> => {
  try {
    let result: any = connector.table(staffTable).select("*").where({ staff_code: staffCode });

    return [];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};
export const getSingleStaffWithUserCode = async (userCode: string): Promise<any> => {
  try {
    let result: any = connector.table(staffTable).select("*").where({ user_code: userCode });

    return [];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const createStaffEmploymentDetails = async (details: StaffEmploymentDetails): Promise<any> => {};

export const updateStaffEmploymentDetails = async (staffCode: string): Promise<any> => {};

export const getStaffEmploymentDetails = async (staffCode: string): Promise<any> => {};
