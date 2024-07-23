import { TestUser } from "@/apptypes";
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
        "CREATE TABLE IF NOT EXISTS TestUsers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER);"
      );
    });

    db?.execAsync(
      'INSERT INTO TestUsers (name, age) VALUES ("John Doe", "30")'
    );

    db?.getAllAsync("SELECT * FROM TestUsers").then((data) => {
      const usersList = data as TestUser[];
      setUsersList(usersList);
    });
    return () => {
      db?.closeAsync();
    };
  }, []);

  const getAllUSers = async () => {
    const users = (await db?.getAllAsync(
      "SELECT * FROM TestUsers"
    )) as TestUser[];
    setUsersList(users);
  };

  return { db, getAllUSers, usersList };
};
