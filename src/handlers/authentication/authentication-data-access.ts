import * as knex from "knex";
import { Connection } from "../../config/database";
import { DatabaseError } from "../../utilities/errors/errors";
import { sanitize } from "../../utilities/helpers/helpers";
import { AuthenticationProfile } from "./authentication.model";
import logger from "../../utilities/helpers/logger";

const authTable: string = "authentication";
const connector: knex = new Connection().knex();

export const createAuthenticationProfile = async (authProfile: AuthenticationProfile): Promise<any> => {
  try {
    let result = await connector
      .table(authTable)
      .insert({
        user_code: authProfile.userCode,
        email_address: authProfile.emailAddress,
        account_type: authProfile.accountType,
        active: authProfile.active,
        enabled: authProfile.active,
        verification_code: authProfile.verificationCode,
        verification_code_expiry: authProfile.verificationCodeExpiry,
        created_date: new Date(),
        updated_date: new Date(),
      })
      .returning("user_code");

    if (Array.isArray(result)) {
      return result[0];
    } else {
      return result;
    }
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const updateAuthenticationProfile = async (authProfile: AuthenticationProfile) => {
  try {
    let result = await connector
      .table(authTable)
      .update({
        email_address: authProfile.emailAddress,
        account_type: authProfile.accountType,
        active: authProfile.active,
        enabled: authProfile.active,

        verification_code: authProfile.verificationCode,
        verification_code_expiry: authProfile.verificationCodeExpiry,
        created_date: new Date(),
        updated_date: new Date(),
      })
      .where({ auth_id: authProfile.authenticationId })
      .returning("email_address");
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const updateProfileForPasswordRequest = async (emailAddress: string, token: string) => {
  try {
    let result = connector
      .table(authTable)
      .update({
        verification_code: token,
        verification_code_expiry: new Date().getTime() + 84000000,
        updated_date: new Date(),
      })
      .where({ email_address: emailAddress })
      .returning("email_address");

    return result;
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const updateAuthProfilePassword = async (password: string, verificationCode: string) => {
  try {
    let result = connector
      .table(authTable)
      .update({
        wakanda: password,
        active: true,
        enabled: true,
        updated_date: new Date(),
      })
      .where({ verification_code: verificationCode })
      .returning("user_code");
    // let email:any[]  = result;
    return result;
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getAuthenticationProfileViaUserCode = async (userCode: string) => {
  try {
    let result = await connector.table(authTable).select("*").where({ user_code: userCode });
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getAuthenticationProfileViaVerificationCode = async (verificationCode: string) => {
  try {
    let result = await connector.table(authTable).select("*").where({ verification_code: verificationCode });
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getValidAuthenticationProfile = async (emailAddress: string, password: string) => {
  try {
    let result = await connector.table(authTable).select("*").where({ email_address: emailAddress });

    let authPrf = result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getAuthenticationProfileViaEmail = async (emailAddress: string): Promise<AuthenticationProfile> => {
  try {
    let result = await connector.table(authTable).select("*").where({ email_address: emailAddress });

    const profile: any = sanitize(result[0]);
    let authProd: AuthenticationProfile = {
      authenticationId: profile.authId,
      userCode: profile.userCode,
      emailAddress: profile.emailAddress,
      active: profile.active,
      accountType: profile.accountType,
      password: profile.wakanda,
      verificationCode: profile.verificationCode,
      verificationCodeExpiry: profile.verificationCodeExpiry,
    };

    return authProd;
  } catch (error) {
    logger.error(error.message);

    throw new DatabaseError("Internal connection error");
  }
};

export const getAccountTypes = async () => {
  try {
    let result: any = await connector.raw(`SELECT unnest(enum_range(NULL::account_type))`);
    let types: any[] = result.rows.map((accountType: { unnest: any }) => {
      return accountType.unnest;
    });
    return types;
  } catch (error) {
    logger.error(error.message);
  }
  // return [];
};

export const checkIfAuthenticationProfileExists = async (emailAddress: string): Promise<boolean> => {
  try {
    let result: any = await connector.table(authTable).count("email_address").where({ email_address: emailAddress });

    return result[0].count > 0 ? true : false;
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const checkIfTokenIsValidForUserEmail = async (emailAddress: string, token: string) => {};

export const checkIfTokenIsValid = async (token: string): Promise<boolean> => {
  try {
    let result = await connector.table(authTable).select("verification_code_expiry").where({ verification_code: token });

    // console.log(result[0].verification_code_expiry);

    return result[0].verification_code_expiry > new Date().getTime() ? true : false;
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};
export const getTokenAndExpiry = async (token: string): Promise<string> => {
  try {
    let result = await connector.table(authTable).select("verification_code_expiry").where({ verification_code: token });

    return result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};
