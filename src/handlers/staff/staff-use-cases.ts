import logger from "../../utilities/helpers/logger";
import { Staff, StaffEmploymentDetails, AccountAssignment } from "./staff.model";
import { validateStaffDetails, validateEmploymentDetails, validateStaffAssignment } from "./staff-validator";
import { createStaff, createStaffEmploymentDetails, getStaffEmploymentDetails, getSingleStaff, getStaff, getSingleStaffWithUserCode, addStaffToDepartment, addStaffToZonalCommand, addStaffToUnit, staffDetailsExists, updateStaff, staffEmploymentExists, updateStaffEmploymentDetails, getDetailedStaff } from "./staff-data-access";
import { getUnitViaDepartment } from "../zonal-command/zonal-command-data-access";

/**
 * Create staff
 */
export const userCreatesStaff = async (staffProspect: any): Promise<string> => {
  try {
    let staff: Staff = validateStaffDetails(staffProspect);

    let staffCode = staff.staffCode;
    if (await staffDetailsExists(staff.staffCode)) {
      staffCode = await updateStaff(staff);
    } else {
      staffCode = await createStaff(staff);
    }
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

    let staffCode;

    if (await staffEmploymentExists(validDetails.staffNumber)) {
      staffCode = await updateStaffEmploymentDetails(validDetails);
    } else {
      staffCode = await createStaffEmploymentDetails(validDetails);
    }

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
  console.log(details);

  try {
    let validDetails: StaffEmploymentDetails = validateEmploymentDetails(details);
    console.log(validDetails);

    let staffCode;

    if (await staffEmploymentExists(validDetails.staffNumber)) {
      staffCode = await updateStaffEmploymentDetails(validDetails);
    } else {
      staffCode = await createStaffEmploymentDetails(validDetails);
    }
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
export const userAddsStaffToDepartment = async (): Promise<string> => {
  try {
  } catch (error) {
    logger.error(error.messsage);
    throw error;
  }
  return "";
};

export const userAddsStaffToZonalCommand = async (staffCode: string, zonalCommandCode: string) => {
  try {
    //check if staff is in unit
  } catch (error) {
    logger.error(error.messsage);
    throw error;
  }
};

export const userAddsStaffToUnit = async (staffCode: string, unitCode: string) => {
  try {
    // check if staff in unit
  } catch (error) {
    logger.error(error.messsage);
    throw error;
  }
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
export const userGetsStaffList = async (pageSize?: number, pageNumber?: number): Promise<any[]> => {
  try {
    return await getStaff(pageSize, pageNumber);
  } catch (error) {
    logger.error(error.messsage);
    throw error;
  }
};

/**
 * Get Staff members
 */
export const userGetsStaffDetailList = async (pageSize?: number, pageNumber?: number): Promise<any[]> => {
  try {
    return await getDetailedStaff(pageSize, pageNumber);
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

export const userGetsStaffEmploymentetails = async (staffCode: string): Promise<any> => {
  try {
    return await getStaffEmploymentDetails(staffCode);
  } catch (error) {
    logger.error(error.messsage);
    throw error;
  }
};

export const performInitalStaffAssignment = async (assignmentRequest: any) => {
  try {
    let assignment: AccountAssignment = validateStaffAssignment(assignmentRequest);
    //assign to zonal command

    let dept = await addStaffToDepartment(assignment.userCode, assignment.departmentCode);

    logger.info("Dept reg complete");
    let zone = await addStaffToZonalCommand(assignment.userCode, assignment.zonalCommandCode);

    logger.info("Zone reg complete");
    //get unit code
    let unit: any = await getUnitViaDepartment(assignment.zonalCommandCode, assignment.departmentCode);

    console.log(unit);

    let unReg = await addStaffToUnit(assignment.userCode, unit.unitCode);

    logger.info("Unit reg reg complete");
    // create employment details

    let employment: StaffEmploymentDetails = {
      userCode: assignment.userCode,
      staffCode: assignment.userCode,
      staffNumber: assignment.userCode,
      zonalCommandCode: assignment.zonalCommandCode,
      departmentCode: assignment.departmentCode,
      designation: "",
      gradeLevel: "",
      step: "",
      unit: unit.unitCode,
      employedDate: new Date(),
    };

    console.log(employment);

    let reg = await createStaffEmploymentDetails(employment);
    logger.info("Initial assignment complete");
    //assign to department
    //assign to unit
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};
