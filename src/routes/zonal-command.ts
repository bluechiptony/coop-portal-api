import { Router } from "express";
import { createZonalCommand, getZonalCommands, getZonalCommand, createUnitForZonalCommand, getUnitsForZonalCommand, getZonalCommandHead } from "../handlers/zonal-command/zonal-command-adapter";

const ZonalCommandroutes = Router();

ZonalCommandroutes.get("/zonal-commands", getZonalCommands);
ZonalCommandroutes.post("/create", createZonalCommand);
ZonalCommandroutes.post("/create/full", createZonalCommand);
ZonalCommandroutes.get("/get/:zonalcommand", getZonalCommand);
ZonalCommandroutes.post("/unit/create", createUnitForZonalCommand);
ZonalCommandroutes.get("/units/get/:zonalcommand", getUnitsForZonalCommand);
ZonalCommandroutes.get("/get/head/:zonalcommand", getZonalCommandHead);
ZonalCommandroutes.get("/set/head", createUnitForZonalCommand);
// ZonalCommandroutes.get("/lgas", getLgas);
// ZonalCommandroutes.get("/countries", getCountries);

export default ZonalCommandroutes;
