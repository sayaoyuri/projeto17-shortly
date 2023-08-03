import { nanoid } from "nanoid";
import { deleteUrlById, getUrlById, getUrlByShortUrl, saveUrl } from "../repositories/url.repository.js";

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

export const getUrl = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await getUrlById(id);

    if(result.rowCount === 0) return res.sendStatus(404);

    const url = { ...result.rows[0] };
    delete url.ownerId;
    delete url.visitCount;
    delete url.createdAt;

    return res.status(200).send(url);
  } catch (err) {
    return res.status(500).send(err.message);
  };
};

export const deleteUrl = async (req, res) => {
  try {
    const ownerId = res.locals.token.id;
    const { id } = req.params;

    const result = await getUrlById(id);

    if(result.rowCount === 0) return res.sendStatus(404);
    
    if(result.rows[0].ownerId !== ownerId) return res.sendStatus(401);

    await deleteUrlById(id, ownerId);

    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).send(err.message);
  };
};