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
