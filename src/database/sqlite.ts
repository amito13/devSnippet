import * as SQLite from "expo-sqlite";
import { CREATE_SNIPPETS_TABLE } from "./schema";

const db = SQLite.openDatabaseSync("devnotes.db");

export const initializeDatabase = async () => {
  try {
    await db.execAsync(CREATE_SNIPPETS_TABLE);

    console.log("Database initialized");
  } catch (error) {
    console.log("Database error:", error);
  }
};

export default db;