import * as knex from "knex";
import { Connection } from "../../config/database";
import { DatabaseError } from "../../utilities/errors/errors";
import { sanitize } from "../../utilities/helpers/helpers";
import logger from "../../utilities/helpers/logger";
import { Staff, StaffEmploymentDetails } from "./staff.model";

const connector: knex = new Connection().knex();

const staffTable: string = "staff";
const staffDepartmentTable: string = "department_staff";
const staffZonalCommandTable: string = "zonal_command_staff";
const staffUnitTable: string = "unit_staff";
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
        gender: staff.gender,
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
        gender: staff.gender,
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
    let result: any = await connector.table(staffEmploymentTable).select("*").where({ staff_code: staffCode });

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

//staff department function

export const addStaffToDepartment = async (staffCode: string, departmentCode: string): Promise<string> => {
  try {
    let result: any = await connector
      .table(staffDepartmentTable)
      .insert({
        department_code: departmentCode,
        staff_code: staffCode,
        created_date: new Date(),
        updated_date: new Date(),
      })
      .returning("staff_code");
    return result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};
export const updateStaffDepartment = async (staffCode: string, prevDepartmentCode: string, currentDepartmentCode: string): Promise<string> => {
  try {
    let result: any = await connector
      .table(staffDepartmentTable)
      .update({
        department_code: currentDepartmentCode,
        updated_date: new Date(),
      })
      .where({
        staff_code: staffCode,
        department_code: prevDepartmentCode,
      })
      .returning("staff_code");
    return result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const staffInDepartment = async (staffCode: string): Promise<boolean> => {
  try {
    let result: any = await connector.table(staffDepartmentTable).count("staff_code").where({ staff_code: staffCode });
    return result[0].count > 0 ? true : false;
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

//Staff unit functions

export const addStaffToUnit = async (staffCode: string, unitCode: string): Promise<string> => {
  try {
    let result: any = await connector
      .table(staffUnitTable)
      .insert({
        unit_code: unitCode,
        staff_code: staffCode,
        created_date: new Date(),
        updated_date: new Date(),
      })
      .returning("staff_code");
    return result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const updateStaffUnit = async (staffCode: string, prevUnitCode: string, currentUnitCode: string): Promise<string> => {
  try {
    let result: any = await connector
      .table(staffUnitTable)
      .update({
        unit_code: currentUnitCode,
        updated_date: new Date(),
      })
      .where({
        staff_code: staffCode,
        unit_code: prevUnitCode,
      })
      .returning("staff_code");
    return result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const staffInUnit = async (staffCode: string): Promise<boolean> => {
  try {
    let result: any = await connector.table(staffUnitTable).count("staff_code").where({ staff_code: staffCode });
    return result[0].count > 0 ? true : false;
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

//Staff Zonal Command
export const addStaffToZonalCommand = async (staffCode: string, zonalCommandCode: string): Promise<string> => {
  try {
    let result: any = await connector
      .table(staffZonalCommandTable)
      .insert({
        zonal_command_code: zonalCommandCode,
        staff_code: staffCode,
        created_date: new Date(),
        updated_date: new Date(),
      })
      .returning("staff_code");
    return result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};
export const updateStaffZonalCommand = async (staffCode: string, prevZonalCommandCode: string, currentZonalCommandCode: string): Promise<string> => {
  try {
    let result: any = await connector
      .table(staffZonalCommandTable)
      .update({
        zonal_command_code: currentZonalCommandCode,
        updated_date: new Date(),
      })
      .where({
        staff_code: staffCode,
        zonal_command_code: prevZonalCommandCode,
      })
      .returning("staff_code");
    return result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const staffInZonalCommand = async (staffCode: string): Promise<boolean> => {
  try {
    let result: any = await connector.table(staffZonalCommandTable).count("staff_code").where({ staff_code: staffCode });
    return result[0].count > 0 ? true : false;
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};
