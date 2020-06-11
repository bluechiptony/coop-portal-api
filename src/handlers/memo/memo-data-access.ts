import * as knex from "knex";
import { Connection } from "../../config/database";
import { DatabaseError } from "../../utilities/errors/errors";
import { sanitize } from "../../utilities/helpers/helpers";
import logger from "../../utilities/helpers/logger";
import { Memo } from "./memo.model";

const connector: knex = new Connection().knex();

const memoTable: string = "memos";
const memoCorrespondentsTable: string = "memo_correspondents";
const memoResponsesTable: string = "memo_responses";
const memoUnits: string = "memo_units";

const memoAssignmentTable = "memo_assignments";
const memoCorrespondenceTable = "memo_correspondence";
const memoDocumentTable = "memo_documents";
const memoCorrespondenceDocTable = "memo_correspondence_documents";

/* Data tables
 * Memos
 * Memo Assignments
 * Memo Documents
 *
 */

export const createMemo = async (memo: Memo, creator?: any) => {
  try {
    let result = await connector
      .table(memoTable)
      .insert({
        memo_code: memo.memoCode,
        memo_title: memo.memoTitle,
        memo_description: memo.memoDescription,
        memo_status: memo.resolved,
        created_date: new Date().getTime(),
        updated_date: new Date().getTime(),
        created_by: creator.userCode,
        updated_by: creator.userCode,
      })
      .returning("memo_code");

    return result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const updateMemo = async (memo: Memo, editor?: any) => {
  try {
    let result = await connector
      .table(memoTable)
      .update({
        memo_title: memo.memoTitle,
        memo_description: memo.memoDescription,
        updated_date: new Date().getTime(),
        updated_by: editor.userCode,
      })
      .where({ memo_code: memo.memoCode })
      .returning("memo_code");

    return result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const changeMemoStatus = async (memoCode: string, status: string, editor?: any) => {
  try {
    let result = await connector
      .table(memoTable)
      .update({
        memo_status: status,
        updated_date: new Date().getTime(),
        updated_by: editor.userCode,
      })
      .where({ memo_code: memoCode })
      .returning("memo_code");

    return result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const linkDocumentToMemo = async (memoCode: string, document: any, creator?: any) => {
  try {
    let result = await connector
      .table(memoDocumentTable)
      .insert({
        document_code: document.documentCode,
        memo_code: memoCode,
        url: document.url,
        active: true,
        created_date: new Date().getTime(),
        updated_date: new Date().getTime(),
        created_by: creator.userCode,
        updated_by: creator.userCode,
      })
      .returning("memo_code");
    return result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const unlinkDocumentFromMemo = async (memoCode: string, documentCode: string) => {
  try {
    let result = await connector
      .table(memoDocumentTable)
      .update({
        active: false,
      })
      .where({ document_code: documentCode, memo_code: memoCode })
      .returning("memo_code");
    return result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const relinkDocumentToMemo = async (memoCode: string, documentCode: string) => {
  try {
    let result = await connector
      .table(memoDocumentTable)
      .update({
        active: true,
      })
      .where({ document_code: documentCode, memo_code: memoCode })
      .returning("memo_code");
    return result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const createMemoAssignment = async (memoCode: string, userCode: string) => {
  try {
    let result = await connector
      .table(memoAssignmentTable)
      .insert({
        memo_code: memoCode,
        user_code: userCode,
        active: true,
      })
      .returning("memo_code");

    return result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const createMemoAssignments = async (memoAssignments: any[]) => {
  try {
    let result = await connector.table(memoAssignmentTable).insert(memoAssignments).returning("memo_code");

    return result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const unlinkMemoAssignment = async (memoCode: string, userCode: string) => {
  try {
    let result = await connector
      .table(memoAssignmentTable)
      .update({
        active: false,
      })
      .where({ memo_code: memoCode, user_code: userCode })
      .returning("memo_code");

    return result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getMemos = async () => {
  try {
    let result = await connector.table(memoTable).select("*");
    return sanitize(result);
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getMemo = async (memoCode: string) => {
  try {
    let result = await connector.table(memoTable).select("*").where({ memo_code: memoCode });

    return sanitize(result[0]);
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getMemosByStatus = async (memoStatus: string) => {
  try {
    let result = await connector.table(memoTable).select("*").where({ status: memoStatus });

    return sanitize(result[0]);
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getMemosByAssignment = async (userCode: string) => {
  try {
    let result = await connector.table(memoAssignmentTable).select("*").where({ user_code: userCode }).innerJoin(memoTable, "memo_assignments.memo_code", "memos.memo_code");

    return sanitize(result);
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getMemoAssignments = async (memoCode: string) => {
  try {
    let result = await connector.table(memoAssignmentTable).select("*").where({ memo_code: memoCode }).innerJoin("users", "memo_assignments.user_code", "users.user_code").innerJoin("senator_profiles", "memo_assignments.user_code", "senator_profiles.user_code").innerJoin("senatorial_districts", "senator_profiles.senatorial_district", "senatorial_districts.district_id").innerJoin("political_parties", "senator_profiles.political_party", "political_parties.party_id");

    return sanitize(result);
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getMemoActiveAssignments = async (memoCode: string) => {
  try {
    let result = await connector.table(memoAssignmentTable).select("user_code").where({ memo_code: memoCode, active: true }).innerJoin("users", "memo_sponsors.user_code", "users.user_code");

    return sanitize(result);
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getMemoDocuments = async (memoCode: string) => {
  try {
    let result = await connector.table(memoDocumentTable).select("*").where({ memo_code: memoCode });
    return sanitize(result);
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const checkIfAssignmentExistsForMemo = async (memoCode: string, userCode: string) => {
  try {
    let result: any = await connector.table(memoAssignmentTable).count("memo_code").where({ memo_code: memoCode, user_code: userCode });

    return result.count > 0 ? true : false;
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const checkIfMemoExists = async (memoCode: string) => {
  try {
    let result: any = await connector.table(memoTable).count("memo_code").where({ memo_code: memoCode });

    console.log(result);

    return result[0].count > 0 ? true : false;
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const checkIfMemoTitleExists = async (memoTitle: string) => {
  try {
    let result: any = await connector.table(memoTable).count("memo_title").where({ memo_title: memoTitle });

    return result[0].count > 0 ? true : false;
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const createMemoCorrespondence = async (response: any, creator?: any) => {
  try {
    let result = await connector
      .table(memoCorrespondenceTable)
      .insert({
        response_code: response.responseCode,
        memo_code: response.memoCode,
        response: response.response,
        email_address: response.emailAddress,
        full_name: response.fullName,
        created_date: new Date().getTime(),
        updated_date: new Date().getTime(),
        created_by: creator.userCode,
        updated_by: creator.userCode,
      })
      .returning("memo_code");

    return result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const createDocumentForCorrespondence = async (document: any, creator: any) => {
  try {
    let result = await connector
      .table(memoCorrespondenceDocTable)
      .insert({
        document_code: document.documentCode,
        response_code: document.responseCode,
        url: document.url,
        active: true,
        created_date: new Date().getTime(),
        updated_date: new Date().getTime(),
        created_by: creator.userCode,
        updated_by: creator.userCode,
      })
      .returning("correspondence_code");

    return result[0];
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getCorrespondenceForMemo = async (memoCode: string) => {
  try {
    let result = await connector.table(memoCorrespondenceTable).select("*").where({ memo_code: memoCode });

    return sanitize(result);
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getDocumentsForMemoCorrespondence = async (correspondenceCode: string) => {
  try {
    let result = await connector.table(memoCorrespondenceDocTable).select("*").where({ correspondence_code: correspondenceCode });

    return sanitize(result);
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};

export const getTotalMemos = async () => {
  try {
    let result: any = await connector.table(memoTable).count("memo_code");
    return result[0].count;
  } catch (error) {
    logger.error(error.message);
    throw new DatabaseError("Internal connection error");
  }
};
