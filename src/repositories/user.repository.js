import { db } from '../database/db.connection.js'

export const createUser = async (name, email, password) => {
  return await db.query(`
    INSERT INTO users (name, email, password) VALUES ($1, $2, $3);
  `, [name, email, password]);
};

export async function getUser (email) {
  return await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
};

export const getUserData = async (id) => {
  return await db.query(`
    SELECT u.id, u.name, SUM(urls."visitCount") AS "visitCount", 
      (SELECT json_agg(row_to_json("allUrls")) FROM (
        SELECT id, "shortUrl", url, "visitCount" 
          FROM urls WHERE urls."ownerId" = u.id ORDER BY urls.id
        ) AS "allUrls"
      ) AS "shortnedUrls"
      FROM users u
      JOIN urls
        ON u.id = urls."ownerId"
      WHERE u.id = $1
      GROUP BY u.id;
  `, [id]);
};