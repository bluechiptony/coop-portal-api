import { Router } from "express";
import { getStates, getLgasForState, getLgas, getCountries } from "../handlers/locale/locale-adapter";
import { getStaffList, getStaffDetailsWithUserCode, createStaffDetails, performStaffAssignment, getStaffEmploymenyWithUserCode } from "../handlers/staff/staff-adapter";

const StaffRoutes = Router();

StaffRoutes.get("/staff", getStaffList);
StaffRoutes.get("/staff/:usercode", getStaffDetailsWithUserCode);
StaffRoutes.get("/staff/employment/:usercode", getStaffEmploymenyWithUserCode);
StaffRoutes.post("/create", createStaffDetails);
StaffRoutes.post("/account/assign", performStaffAssignment);

export default StaffRoutes;
