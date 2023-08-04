import { Router } from "express";
import { validateToken } from "../middlewares/auth.middleware.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { shortenSchema } from "../schemas/url.schema.js";
import { createShortUrl, deleteUrl, getUrl, openShortUrl } from "../controllers/url.controller.js";
import dotenv from 'dotenv';
dotenv.config();

const urlRouter = Router();
urlRouter.post('/urls/shorten', validateToken(process.env.SESSION_TOKEN_KEY || 'signintoken'), validateSchema(shortenSchema), createShortUrl);
urlRouter.get('/urls/open/:shortUrl', openShortUrl);
urlRouter.get('/urls/:id', getUrl);
urlRouter.delete('/urls/:id', validateToken(process.env.SESSION_TOKEN_KEY || 'signintoken'), deleteUrl);

export default urlRouter;