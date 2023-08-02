import { db } from '../database/db.connection.js'

export const createUser = async (name, email, password) => {
  return await db.query(`
    INSERT INTO users (name, email, password) VALUES ($1, $2, $3);
  `, [name, email, password]);
};

export async function getUser (email) {
  return await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
};