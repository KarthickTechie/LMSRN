/*
  @author       karthick.d
  @since        23/07/2024
  @description  : custom hook for db CRUD functionality
  */

import {
  KeyValueString,
  StaticMasterData,
  SubProductColumns,
  TableConfig,
  TestUser,
} from "@/apptypes";
import { OrganizationMasterColumns, ProductMasterColumns } from "@/apptypes";
import { DBSchemaConstants } from "@/constants";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";

export const useDBUtils = () => {
  const [db, setDb] = useState<SQLite.SQLiteDatabase>();
  const [usersList, setUsersList] = useState<TestUser[]>([]);
  const testDBPrepare = async () => {
    const db = await SQLite.openDatabaseAsync("lms.db");
    setDb(db);
  };
  useEffect(() => {
    testDBPrepare();
    db?.withTransactionAsync(async () => {
      db.execAsync(
        `CREATE TABLE IF NOT EXISTS TestUsers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER);`
      );
    });

    db?.execAsync(
      'INSERT INTO TestUsers (name, age) VALUES ("John Doe", "30")'
    );

    db?.getAllAsync("SELECT * FROM TestUsers").then((data) => {
      const usersList = data as TestUser[];
      setUsersList(usersList);
    });
    if (db) {
      createTable(db, {
        tableName: DBSchemaConstants.ORIG_ZONAL_MASTER,
        pk: DBSchemaConstants.ZONE_ID,
        tableData: OrganizationMasterColumns,
      });

      getTotalRowsByTableName(db, DBSchemaConstants.ORIG_ZONAL_MASTER);
    }
    return () => {
      db?.closeAsync();
    };
  }, []);

  /*
  @author       karthick.d
  @since        23/07/2024
  @description  : get all rows from TestUsers table 
  */
  const getAllUSers = async () => {
    const users = (await db?.getAllAsync(
      "SELECT * FROM TestUsers"
    )) as TestUser[];
    setUsersList(users);
  };

  /*
  @author       karthick.d
  @since        23/07/2024
  @description  : utility method for creating tables dynamically 
  */
  const createTable = async (
    db: SQLite.SQLiteDatabase,
    tableConfig: TableConfig
  ) => {
    const querystring = createQueryString(OrganizationMasterColumns);
    console.log(querystring);

    db.execAsync(`CREATE TABLE IF NOT EXISTS ${tableConfig.tableName}
      (
      ${tableConfig.pk} INTEGER PRIMARY KEY AUTOINCREMENT, ${querystring}
      )`);
  };

  /*
  @author       karthick.d
  @since        23/07/2024
  @description  : utility method for create tables colums query string
  */

  const createQueryString = (tableData: KeyValueString): string => {
    const keys: string[] = Object.keys(tableData);
    let querystring = ``;
    keys.forEach((k, index) => {
      if (index < keys.length - 1) querystring += `${k} ${tableData[k]}, `;
      else querystring += `${k} ${tableData[k]}`;
    });
    console.log(`create table query string => ${querystring}`);
    return querystring;
  };

  /*
    @author       karthick.d
    @since        23/07/2024
    @description  :     utility method for get no of rows from table

  */

  const getTotalRowsByTableName = async (
    db: SQLite.SQLiteDatabase,
    tableName: string
  ) => {
    const result = await db.getFirstAsync(`SELECT COUNT(*) FROM ${tableName}`);
    console.log(result);
  };

  return { db, getAllUSers, usersList, getTotalRowsByTableName };
};
