import { db } from '../database/db.connection.js'

export async function createUser (name, email, password) {
  return await db.query(`
    INSERT INTO users (name, email, password) VALUES ($1, $2, $3);
  `, [name, email, password]);
};