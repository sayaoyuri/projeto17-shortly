import { nanoid } from "nanoid";
import { getUrlByShortUrl, saveUrl } from "../repositories/url.repository.js";

export const createShortUrl = async (req, res) => {
  try {
    const ownerId = res.locals.token.id;
    const { url } = req.body;

    const urlShortId = nanoid(8);
    
    await saveUrl(ownerId, url, urlShortId);

    const result = await getUrlByShortUrl(urlShortId);

    const { id, shortUrl } = result.rows[0]

    return res.status(201).send({ id, shortUrl })
  } catch (err) {
    if(err.code === '23503') return res.sendStatus(401);

    return res.status(500).send(err.message);
  };
};