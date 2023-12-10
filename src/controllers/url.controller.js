import { urlService } from '../services/url.service.js';

export const createShortUrl = async (req, res) => {
  const ownerId = res.locals.token.id;
  const { url } = req.body;

  const createdUrl = await urlService.create({ ownerId, url });

  return res.status(201).send(createdUrl);
};

export const getUrl = async (req, res) => {
  const { id } = req.params;

  const url = await urlService.findById({ id });

  return res.status(200).send(url);
};

export const openShortUrl = async (req, res) => {
  const { shortUrl } = req.params;

  const url = await urlService.openShortUrl({ shortUrl });

  return res.redirect(url);
};

export const deleteUrl = async (req, res) => {
  const ownerId = res.locals.token.id;
  const { id } = req.params;

  await urlService.deleteUrl({ id, ownerId });

  return res.sendStatus(204);
};
