/*
@author         :   karthick.d
@since          :   25/07/2024
@description    :   returns db utility methods for CRUD operations of Masters table
insert , update , select , delete ops of Masters table
*/

import { SQLiteDatabase } from "expo-sqlite";
import { getColumns, prepareDB } from "./dbservices";
import { DBSchemaConstants } from "@/constants";
import { OrganizationMasterColumns } from "@/apptypes";

/* 
@usage      : insert zonal master data ,
@args       : db - dbinstance , data is a object to save in table
*/
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
    const query = `INSERT INTO ORIG_ZONAL_MASTER (orgCode,orgId,orgLevel,orgName,orgScode)
    VALUES ("${orgCode}", "${orgId}", "${orgLevel}", "${orgName}", "${orgScode}")`;
    console.log(query);
    await db.execAsync(query);
    console.info(`inser table ${DBSchemaConstants.ORIG_ZONAL_MASTER} success`);
  } catch (error) {
    console.error(
      `inser table ${DBSchemaConstants.ORIG_ZONAL_MASTER} error : ${error}`
    );
  }
};

// find and return all rows from table ORIG_ZONAL_MASTER
export const findAll = async () => {
  const db = await prepareDB();
  const allRows = await db.getAllAsync(`SELECT * FROM ORIG_ZONAL_MASTER`);
  for (const row of allRows) {
    console.log(JSON.stringify(row));
  }
};

export const deleteAll = async () => {
  const db = await prepareDB();
  await db.execAsync(`DELETE FROM ORIG_ZONAL_MASTER`); // Binding named parameters from object
};
