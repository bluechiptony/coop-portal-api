import { Router } from "express";
import { getStates, getLgasForState, getLgas } from "../handlers/locale/locale-adapter";

const LocaleRoutes = Router();

LocaleRoutes.get("/states", getStates);
LocaleRoutes.get("/lgas/state/:state", getLgasForState);
LocaleRoutes.get("/lgas", getLgas);

export default LocaleRoutes;
