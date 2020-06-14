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

export const createStaff = async (staff: Staff, creator?: string): Promise<string> => {
  try {
    let result: any = await connector
      .table(staffTable)
      .insert({
        staff_code: staff.staffCode,
        first_name: staff.firstName,
        middle_name: staff.middleName,
        last_name: staff.lastName,
        date_of_birth: staff.dob,
        state_of_origin: staff.stateOfOrigin,
        lga_of_origin: staff.lgaOfOrigin,
        created_date: new Date(),
        updated_date: new Date(),
        created_by: creator,
        updated_by: creator,
      })
      .returning("staff_code");
    return result[0];
    // return result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const updateStaff = async (staff: Staff, editor: string): Promise<string> => {
  try {
    let result: any = await connector
      .table(staffTable)
      .update({
        first_name: staff.firstName,
        middle_name: staff.middleName,
        last_name: staff.lastName,
        date_of_birth: staff.dob,
        state_of_origin: staff.stateOfOrigin,
        lga_of_origin: staff.lgaOfOrigin,
        updated_date: new Date(),
        updated_by: editor,
      })
      .where({ staff_code: staff.staffCode })
      .returning("staff_code");

    return result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getStaff = async (pageSize?: number, pageNumber?: number): Promise<any[]> => {
  try {
    let result: any = connector.table(staffTable).select("*");
    return await sanitize(result);
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getSingleStaff = async (staffCode: string): Promise<any> => {
  try {
    let result: any = connector.table(staffTable).select("*").where({ staff_code: staffCode });

    return await sanitize(result[0]);
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};
export const getSingleStaffWithUserCode = async (userCode: string): Promise<any> => {
  try {
    let result: any = connector.table(staffTable).select("*").where({ user_code: userCode });

    return await sanitize(result[0]);
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const createStaffEmploymentDetails = async (details: StaffEmploymentDetails, creator?: string): Promise<any> => {
  try {
    let result: any = await connector
      .table(staffEmploymentTable)
      .insert({
        staff_code: details.staffCode,
        command_code: details.zonalCommand,
        department_code: details.department,
        unit_code: details.unit,
        designation: details.designation,
        grade_level: details.gradeLevel,
        step: details.step,
        date_of_employment: details.employedDate,
        service_retirement_date: details.serviceRetirementDate,
        created_date: new Date(),
        updated_date: new Date(),
        created_by: creator,
        updated_by: creator,
      })
      .returning("staff_code");
    return result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const updateStaffEmploymentDetails = async (details: StaffEmploymentDetails, editor?: string): Promise<any> => {
  try {
    let result: any = await connector
      .table(staffEmploymentTable)
      .update({
        staff_code: details.staffCode,
        command_code: details.zonalCommand,
        department_code: details.department,
        unit_code: details.unit,
        designation: details.designation,
        grade_level: details.gradeLevel,
        step: details.step,
        date_of_employment: details.employedDate,
        service_retirement_date: details.serviceRetirementDate,
        updated_date: new Date(),
        updated_by: editor,
      })
      .returning("staff_code")
      .where({ staff_code: details.staffCode });
    return result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getStaffEmploymentDetails = async (staffCode: string): Promise<any> => {
  try {
    let result: any = connector.table(staffEmploymentTable).select("*").where({ staff_code: staffCode });

    return await sanitize(result[0]);
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};
