/*
@author         :   karthick.d
@since          :   25/07/2024
@description    :   returns db utility methods for returning db instances and querying 
columns counts etc
*/
import { KeyValueString } from "@/apptypes";
import * as SQLite from "expo-sqlite";

export const prepareDB = async () => {
  const dbInstance = await SQLite.openDatabaseAsync("lms.db");
  return dbInstance;
};

export const prepareDBWithName = async (dbName: string) => {
  const dbInstance = await SQLite.openDatabaseAsync(dbName);
  return dbInstance;
};

export const getColumns = (tableColumns: KeyValueString): string => {
  return Object.keys(tableColumns).join();
};

export const deleteTableDataByTableNames = async (tables: string[]) => {
  const db = await prepareDB();
  try {
    tables.forEach(async (table) => {
      await db.execAsync(`DELETE FROM ${table}`); // Binding named parameters from object
      console.log(`All rows in ${table} deleted`);
    });
  } catch (error) {
    console.error(
      `Error occured in function deleteTableDataByTableNames : ${JSON.stringify(error)}`
    );
  }
};

/*
@author          : karthick.d
@since           : 08/07/2024
@desc            : method returns no of rows in the given table
@params          : table name 
*/
export const getTotalRowsByTableName = async (tableName: string) => {
  const db = await prepareDB();
  if (db) {
    const result = await db.getFirstAsync(`SELECT COUNT(*) FROM ${tableName}`);
    console.log(`table ${tableName}: ${JSON.stringify(result)}`);
  }
};

/*

column mapping 

PRODUCT_MAIN_CATEGORY 

  vertical: "TEXT", -> lsfBizVertical
  facDesc: "TEXT" -> lsfFacDesc
  facId: "TEXT", -> lsfFacId
  facParentID: "TEXT", -> lsfFacParentId


PRODUCT_SUB_CATEGORY

  vertical: "TEXT", -> lsfBizVertical
  facDesc: "TEXT" -> lsfFacDesc
  facId: "TEXT", -> lsfFacId
  facParentID: "TEXT", -> lsfFacParentId

ORIG_STATIC_DATA_MASTERS

  rdValueCode: "TEXT", -> rdValueCode
  rdValueDescription: "TEXT", -> rdValueDescription
  master_id: "INTEGER NOT NULL DEFAULT ''", -> masterid

ORIG_STATE_MASTERS

  sgmStateName: "TEXT", -> sgmStateName
  sgmStateCode: "TEXT", -> sgmStateCode

*/
