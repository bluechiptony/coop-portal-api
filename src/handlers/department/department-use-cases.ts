import logger from "../../utilities/helpers/logger";
import { Department } from "./department.model";
import { validateDepartment } from "./department-validator";
import { departmentNameExists, createDepartment, updateDepartment, getDepartments } from "./department-data-access";

/**
 * Create nw Department
 */
export const userCreatesDepartment = async (departmentProspect: any, creator?: string): Promise<string> => {
  try {
    let department: Department = validateDepartment(departmentProspect);

    if (await departmentNameExists(department.departmentName)) {
      throw Error("Department name already exists");
    }

    let departmentCode: string = await createDepartment(department, creator);

    return departmentCode;
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

/**
 * Update existing department
 */
export const userUpdatesDepartment = async (departmentProspect: any, editor?: string): Promise<string> => {
  try {
    let department: Department = validateDepartment(departmentProspect);

    let departmentCode: string = await updateDepartment(department, editor);

    return departmentCode;
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

/**
 * Change department's status
 */
export const UserChangeDepartmentStatus = async (): Promise<string> => {
  return "";
};

/**
 * Get departments
 */
export const userGetsDepartments = async (): Promise<any[]> => {
  try {
    return await getDepartments();
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

/**
 * Get Single department
 */
export const userGetSingleDepartment = async (): Promise<any> => {
  return {};
};

export const userCreatesDepartmentUnit = async (): Promise<any> => {};

export const userSetsDepartmentHead = async (): Promise<any> => {};

export const userSetsDepartmentUnithead = async (): Promise<any> => {};
