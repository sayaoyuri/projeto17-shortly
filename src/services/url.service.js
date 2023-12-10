import { nanoid } from "nanoid";
import { urlRepository } from "../repositories/url.repository.js";

function generateUrlId () {
  return nanoid(8);
}

async function create ({ ownerId, url }) {
  const shortUrl = generateUrlId();

  const { rows: createdUrl } = await urlRepository.saveUrl({ ownerId, url, shortUrl });

  return createdUrl[0];
}

export const urlService = { create };