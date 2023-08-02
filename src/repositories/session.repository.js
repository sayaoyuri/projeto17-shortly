import { db } from "../database/db.connection.js";

export const saveToken = async (userId, token) => {
  return await db.query(`INSERT INTO sessions ("userId", token) VALUES($1, $2)`, [userId, token]);
};