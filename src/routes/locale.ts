import { Router } from "express";
import { getStates, getLgasForState, getLgas, getCountries } from "../handlers/locale/locale-adapter";

const LocaleRoutes = Router();

LocaleRoutes.get("/states", getStates);
LocaleRoutes.get("/lgas/state/:state", getLgasForState);
LocaleRoutes.get("/lgas", getLgas);
LocaleRoutes.get("/countries", getCountries);

export default LocaleRoutes;
