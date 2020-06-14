import * as knex from "knex";
import { Connection } from "../../config/database";
import { DatabaseError } from "../../utilities/errors/errors";
import { sanitize } from "../../utilities/helpers/helpers";
import logger from "../../utilities/helpers/logger";
import { Department, DepartmentUnit } from "./department.model";

const connector: knex = new Connection().knex();

const departmentTable: string = "departments";
const departmentUnitTable: string = "command_units";
const staffTable: string = "staff";

export const createDepartment = async (department: Department, creator?: string): Promise<string> => {
  console.log(department);

  try {
    let result: any = await connector
      .table(departmentTable)
      .insert({
        department_code: department.departmentCode,
        department_name: department.departmentName,
        created_date: new Date(),
        updated_date: new Date(),
        created_by: creator,
        updated_by: creator,
      })
      .returning("department_code");

    console.log(result);

    return result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};
export const updateDepartment = async (department: Department, editor?: string): Promise<any> => {};
export const createDepartmentHead = async (departmentCode: string): Promise<any> => {};
export const updateDepartmentHead = async (departmentCode: string): Promise<any> => {};

export const createDepartmentUnit = async (unit: DepartmentUnit): Promise<any> => {};
export const createDepartmentUnitHead = async (unit: DepartmentUnit): Promise<any> => {};
export const updateDepartmentUnitHead = async (departmentCode: string): Promise<any> => {};

export const createUnitHead = async (departmentCode: string): Promise<any> => {};
export const getDepartments = async () => {
  try {
    let result: any = await connector(departmentTable).select("*");
    return sanitize(result);
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};
export const getDepartment = async (departmentCode: string) => {};

export const getDepartmentHead = async (departmentCode: string) => {
  try {
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connction error");
  }
};

export const getUnit = async (unitCode: string) => {};

export const getUnitHead = async (unitCode: string) => {};

export const departmentNameExists = async (departmentName: string): Promise<boolean> => {
  try {
    let result: any = await connector.table(departmentTable).count("department_name").where({ department_name: departmentName });
    console.log(result[0].count);

    return result[0].count > 0 ? true : false;
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};
export const departmentExists = async (departmentCode: string, departmentName: string): Promise<boolean> => {
  return true;
};
export const departmentUnitExists = async (departmentCode: string, departmentName: string): Promise<boolean> => {
  return true;
};
export const departmentHeadtExists = async (departmentCode: string, departmentName: string): Promise<boolean> => {
  return true;
};
export const departmentUnitHeadtExists = async (departmentCode: string, departmentName: string): Promise<boolean> => {
  return true;
};
