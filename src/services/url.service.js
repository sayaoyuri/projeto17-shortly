import { nanoid } from "nanoid";
import { urlRepository } from "../repositories/url.repository.js";
import { notFoundError } from "../errors/notFound.error.js";

function generateUrlId () {
  return nanoid(8);
}

async function create ({ ownerId, url }) {
  const shortUrl = generateUrlId();

  const { rows: createdUrl } = await urlRepository.saveUrl({ ownerId, url, shortUrl });

  return createdUrl[0];
}

async function findById ({ id }) {
  const result = await urlRepository.getUrlById({ id });

  if(result.rowCount === 0) throw notFoundError('Url');

  const url = { ...result.rows[0] };
  delete url.ownerId;
  delete url.visitCount;
  delete url.createdAt;

  return url;
}

async function openShortUrl({ shortUrl }) {
  const result = await urlRepository.getUrlByShortUrl({ shortUrl });
  if(result.rowCount === 0) throw notFoundError('Url');

  const { id, url, visitCount } = result.rows[0];

  const newVisitCount = visitCount + 1;

  await urlRepository.updateVisitCount({ id, newVisitCount });

  return url;
}

export const urlService = { create, findById, openShortUrl };