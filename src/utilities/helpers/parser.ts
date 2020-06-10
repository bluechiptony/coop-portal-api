import { readFileSync, createReadStream } from "fs";
const neatCsv = require("neat-csv");
import logger from "../../utilities/helpers/logger";

export const readCsvFile = async (url: string): Promise<Object[]> => {
  try {
    let fileData = await readFileSync(url).toString();
    if (fileData.charCodeAt(0) === 0xfeff) {
      fileData = fileData.substr(1);
    }
    let parsed = await neatCsv(fileData);
    return parsed;
  } catch (error) {
    logger.error(error.message);
    throw new Error("Error parsing file");
  }
};
