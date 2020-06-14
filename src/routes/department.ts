import { Router } from "express";
import { createDepartment, getDepartments } from "../handlers/department/department-adapter";

const departmentRoutes = Router();

departmentRoutes.post("/create", createDepartment);
departmentRoutes.get("/get", getDepartments);

export default departmentRoutes;
