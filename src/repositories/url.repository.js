import { db } from "../database/db.connection.js";

export const saveUrl = async (ownerId, url, shortUrl) => {
  return await db.query(`INSERT INTO urls ("ownerId", url, "shortUrl") VALUES ($1, $2, $3)`, [ownerId, url, shortUrl]);
};

export const getUrlByShortUrl = async(shortUrl) => {
  return await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [shortUrl]);
};