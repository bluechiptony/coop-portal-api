import logger from "../../utilities/helpers/logger";
import { Staff, StaffEmploymentDetails } from "./staff.model";
import { validateStaffDetails, validateEmploymentDetails } from "./staff-validator";
import { createStaff, createStaffEmploymentDetails, getStaffEmploymentDetails, getSingleStaff, getStaff, getSingleStaffWithUserCode } from "./staff-data-access";

/**
 * Create staff
 */
export const userCreatesStaff = async (staffProspect: any): Promise<string> => {
  try {
    let staff: Staff = validateStaffDetails(staffProspect);
    let staffCode = await createStaff(staff);
    return staffCode;
  } catch (error) {
    logger.error(error.messsage);
    throw error;
  }
};

/**
 * Update staff
 */
export const userUpdatesStaff = async (staffProspect: any): Promise<string> => {
  try {
    let staff: Staff = validateStaffDetails(staffProspect);
    let staffCode = await createStaff(staff);
    return staffCode;
  } catch (error) {
    logger.error(error.messsage);
    throw error;
  }
};

/**
 * Update staff
 */
export const userUpdateStaffEmploymentDetails = async (details: any): Promise<string> => {
  try {
    let validDetails: StaffEmploymentDetails = validateEmploymentDetails(details);
    let staffCode = await createStaffEmploymentDetails(validDetails);
    return staffCode;
  } catch (error) {
    logger.error(error.messsage);
    throw error;
  }
};

/**
 * Create staff
 */
export const userCreatesStaffEmploymentDetails = async (details: any): Promise<string> => {
  try {
    let validDetails: StaffEmploymentDetails = validateEmploymentDetails(details);
    let staffCode = await createStaffEmploymentDetails(validDetails);
    return staffCode;
  } catch (error) {
    logger.error(error.messsage);
    throw error;
  }
};

/**
 * Change a staff members retired status
 */
export const retitreStaff = async (): Promise<string> => {
  try {
  } catch (error) {
    logger.error(error.messsage);
    throw error;
  }
  return "";
};

/**
 * Change a staff's actige staff
 */
export const changeStaffActiveStatus = async (): Promise<string> => {
  try {
  } catch (error) {
    logger.error(error.messsage);
    throw error;
  }
  return "";
};

/**
 * add staff member to department
 */
export const addStaffToDepartment = async (): Promise<string> => {
  try {
  } catch (error) {
    logger.error(error.messsage);
    throw error;
  }
  return "";
};

/**
 * change staff members department
 */

export const changeStaffMembersDepartment = async (): Promise<string> => {
  try {
  } catch (error) {
    logger.error(error.messsage);
    throw error;
  }
  return "";
};

/**
 * Get Staff members
 */
export const userGetStaffList = async (pageSize?: number, pageNumber?: number): Promise<any[]> => {
  try {
    return await getStaff(pageSize, pageNumber);
  } catch (error) {
    logger.error(error.messsage);
    throw error;
  }
};

export const userGetsSingeStaffWithUsercode = async (userCode: string): Promise<any> => {
  try {
    return await getSingleStaffWithUserCode(userCode);
  } catch (error) {
    logger.error(error.messsage);
    throw error;
  }
};

export const userGetsSingleStaffWithStaffCode = async (staffCode: string): Promise<any> => {
  try {
    return await getSingleStaff(staffCode);
  } catch (error) {
    logger.error(error.messsage);
    throw error;
  }
  return [];
};

/**
 * Get staff members for department
 */
export const getStaffForDepartment = async (): Promise<any[]> => {
  try {
  } catch (error) {
    logger.error(error.messsage);
    throw error;
  }
  return [];
};

/**
 * Get staff members for departmental unit
 */
export const getStaffForUnit = async (): Promise<any[]> => {
  try {
  } catch (error) {
    logger.error(error.messsage);
    throw error;
  }
  return [];
};

export const userGetsStaffEmploymentetaills = async (staffCode: string): Promise<any> => {
  try {
    return await getStaffEmploymentDetails(staffCode);
  } catch (error) {
    logger.error(error.messsage);
    throw error;
  }
  return [];
};
