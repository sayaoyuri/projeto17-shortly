import { db } from '../database/db.connection.js';

export async function createUser ({ name, email, hashedPassword }) {
  return await db.query(
    `
    INSERT INTO users (name, email, password) VALUES ($1, $2, $3);
  `,
    [name, email, hashedPassword],
  );
};

export async function getUser({ email }) {
  return await db.query('SELECT * FROM users WHERE email = $1', [email]);
}

export const getUserData = async ({ id }) => {
  return await db.query(
    `
    SELECT u.id, u.name, SUM(urls."visitCount") AS "visitCount", 
      (SELECT json_agg(row_to_json("allUrls")) FROM (
        SELECT id, "shortUrl", url, "visitCount" 
          FROM urls WHERE urls."ownerId" = u.id ORDER BY urls.id
        ) AS "allUrls"
      ) AS "shortenedUrls"
      FROM users u
      JOIN urls
        ON u.id = urls."ownerId"
      WHERE u.id = $1
      GROUP BY u.id;
  `,
    [id],
  );
};

export const getUsersByVisitCount = async () => {
  return await db.query(`
    SELECT u1.id, u1.name, COUNT(u2.id) AS "linksCount", SUM(u2."visitCount") AS "visitCount" 
      FROM users u1
      LEFT JOIN urls u2
        ON u1.id = u2."ownerId"
      GROUP BY u1.id
      ORDER BY "visitCount" DESC NULLS LAST
      LIMIT 10;
  `);
};

export const userRespository = {
  createUser,
  getUser,
  getUserData,
  getUsersByVisitCount,
};
