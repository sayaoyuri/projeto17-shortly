import { deleteUrlById, getUrlById, getUrlByShortUrl, incrementVisitCount } from "../repositories/url.repository.js";
import { urlService } from "../services/url.service.js";

export const createShortUrl = async (req, res) => {
  const ownerId = res.locals.token.id;
  const { url } = req.body;

  const createdUrl = await urlService.create({ ownerId, url });

  return res.status(201).send(createdUrl)
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

export const openShortUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;

    const result = await getUrlByShortUrl(shortUrl);
    if(result.rowCount === 0) return res.sendStatus(404);

    const { id, url, visitCount } = result.rows[0];

    const newVisitCount = visitCount + 1;

    await incrementVisitCount(id, newVisitCount);

    return res.redirect(url);
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