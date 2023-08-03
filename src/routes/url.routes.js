import { Router } from "express";
import { validateToken } from "../middlewares/auth.middleware.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { shortenSchema } from "../schemas/url.schema.js";
import { createShortUrl } from "../controllers/url.controller.js";

const urlRouter = Router();
urlRouter.post('/urls/shorten', validateToken('signintoken'), validateSchema(shortenSchema), createShortUrl);

export default urlRouter;