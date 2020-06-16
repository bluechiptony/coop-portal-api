import { Router } from "express";
import { getStates, getLgasForState, getLgas, getCountries } from "../handlers/locale/locale-adapter";
import { getStaffList, getStaffDetailsWithUserCode, createStaffDetails, performStaffAssignment, getStaffEmploymentWithUserCode, getStaffDetailList, createStaffEmploymentDetails } from "../handlers/staff/staff-adapter";

const StaffRoutes = Router();

StaffRoutes.get("/staff", getStaffList);
StaffRoutes.get("/staff/detailed", getStaffDetailList);
StaffRoutes.get("/staff/detailed/query", getStaffDetailList);
StaffRoutes.get("/details/:usercode", getStaffDetailsWithUserCode);
StaffRoutes.get("/employment/:usercode", getStaffEmploymentWithUserCode);
StaffRoutes.post("/create", createStaffDetails);
StaffRoutes.post("/employment/create", createStaffEmploymentDetails);
StaffRoutes.post("/account/assign", performStaffAssignment);

export default StaffRoutes;
