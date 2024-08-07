/*
@author         :   karthick.d
@since          :   07/08/2024
@description    :   returns db utility methods for CRUD operations of Masters table
insert , update , select , delete ops of Masters table
*/
import { getColumns, prepareDB } from "./dbservices";
import { DBSchemaConstants } from "@/constants";
import { OrganizationMasterColumns } from "@/apptypes";

/* 
@usage      : insert branch master data ,
@args       : db - dbinstance , data is a object to save in table
*/
const table = DBSchemaConstants.ORIG_BRANCH_MASTER;
export const save = async (data: Record<string, string | number | null>) => {
  const db = await prepareDB();
  const orgCode = data.orgCode;
  const orgId = data.orgId?.toString();
  const orgLevel = "R";
  const orgName = data.orgName?.toString();
  const orgScode = data.orgScode;
  const columns = getColumns(OrganizationMasterColumns);
  console.log(columns);
  try {
    const query = `INSERT INTO ${table} (${columns})
    VALUES ("${orgCode}", "${orgId}", "${orgLevel}", "${orgName}", "${orgScode}")`;
    console.log(query);
    await db.execAsync(query);
    console.info(`inser table ${table} success`);
  } catch (error) {
    console.error(`inser table ${table} error : ${error}`);
  }
};

// find and return all rows from table
export const findAll = async () => {
  const db = await prepareDB();
  const allRows = await db.getAllAsync(`SELECT * FROM ${table}`);
  for (const row of allRows) {
    console.log(JSON.stringify(row));
  }
};

export const deleteAll = async () => {
  const db = await prepareDB();
  await db.execAsync(`DELETE FROM ${table}`); // Binding named parameters from object
};
