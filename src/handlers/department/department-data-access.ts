import * as knex from "knex";
import { Connection } from "../../config/database";
import { DatabaseError } from "../../utilities/errors/errors";
import { sanitize } from "../../utilities/helpers/helpers";
import logger from "../../utilities/helpers/logger";
import { Department } from "./department.model";

const connector: knex = new Connection().knex();

const departmentTable: string = "departments";
const staffTable: string = "staff";

export const createDepartment = async (department: Department): Promise<any> => {};
export const updateDepartment = async (department: Department): Promise<any> => {};
export const getDepartments = async () => {};
export const getDepartment = async (departmentCode: string) => {};
