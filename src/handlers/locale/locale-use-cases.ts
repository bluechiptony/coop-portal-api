import logger from "../../utilities/helpers/logger";
import { getStates, getLgasForState, getLgas } from "./locale-data-access";

export const getAllStates = async () => {
  try {
    return await getStates();
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};
export const getAllLGAsForState = async (stateId: number) => {
  try {
    return await getLgasForState(stateId);
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};
export const getAllLgas = async () => {
  try {
    return await getLgas();
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};
