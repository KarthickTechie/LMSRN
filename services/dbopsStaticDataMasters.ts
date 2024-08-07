/*
@author         :   karthick.d
@since          :   07/08/2024
@description    :   returns db utility methods for CRUD operations of Masters table
insert , update , select , delete ops of Masters table
*/
import { getColumns, prepareDB } from "./dbservices";
import { DBSchemaConstants } from "@/constants";
import { Lov, StaticDataColumns } from "@/apptypes";

/* 
@usage      : insert branch master data ,
@args       : db - dbinstance , data is a object to save in table
*/
const table = DBSchemaConstants.ORIG_STATIC_DATA_MASTERS;

export const save = async (data: Lov) => {
  const db = await prepareDB();
  const columns = getColumns(StaticDataColumns);
  console.log(columns);
  try {
    const query = `INSERT INTO ${table} (${columns})
    VALUES ("${data.rdValueCode}", "${data.rdValueDescription}", "${data.masterid}")`;
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
