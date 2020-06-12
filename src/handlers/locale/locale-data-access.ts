import * as knex from "knex";
import { Connection } from "../../config/database";
import { DatabaseError } from "../../utilities/errors/errors";
import { sanitize } from "../../utilities/helpers/helpers";
import logger from "../../utilities/helpers/logger";

const stateTable: string = "states";
const lgaTable: string = "lgas";
const nationsTable: string = "nationalities";
const connector: knex = new Connection().knex();

export const getNations = async () => {
  try {
    let result = await connector.table(nationsTable).select("*");
    return sanitize(result);
  } catch (error) {
    logger.error(error.messsage);
    throw new DatabaseError("Internal connection error");
  }
};
export const getStates = async () => {
  try {
    let result = await connector.table(stateTable).select("*");
    return sanitize(result);
  } catch (error) {
    logger.error(error.messsage);
    throw new DatabaseError("Internal connection error");
  }
};

export const getLgas = async () => {
  try {
    let result = await connector.table(lgaTable).select("*");
    return sanitize(result);
  } catch (error) {
    logger.error(error.messsage);
    throw new DatabaseError("Internal connection error");
  }
};

export const getLgasForState = async (state: number) => {
  try {
    let result = await connector.table(lgaTable).select("*").where({ state_id: state });
    return sanitize(result);
  } catch (error) {
    logger.error(error.messsage);
    throw new DatabaseError("Internal connection error");
  }
};

export const getNationalities = async () => {
  try {
    let result = await connector.table(nationsTable).select("*");
    return sanitize(result);
  } catch (error) {
    logger.error(error.messsage);
    throw new DatabaseError("Internal connection error");
  }
};

export const getCountries = async () => {
  try {
    let result = await connector.table(nationsTable).select("*");
    return sanitize(result);
  } catch (error) {
    logger.error(error.messsage);
    throw new DatabaseError("Internal connection error");
  }
};

export const getSingleNationality = async (nationId: number) => {
  try {
    let result = await connector.table(nationsTable).select("*").where({ nation_id: nationId });
    return sanitize(result);
  } catch (error) {
    logger.error(error.messsage);
    throw new DatabaseError("Internal connection error");
  }
};
