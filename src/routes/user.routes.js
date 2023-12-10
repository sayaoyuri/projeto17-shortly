import { Router } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import validateSchema from '../middlewares/validateSchema.middleware.js';
import { signInSchema, signUpSchema } from '../schemas/user.schema.js';
import { getRanking, getUserInfo, signIn, signUp } from '../controllers/user.controller.js';
import { validateToken } from '../middlewares/auth.middleware.js';

const userRouter = Router();
userRouter.post('/signup', validateSchema(signUpSchema), signUp);
userRouter.post('/signin', validateSchema(signInSchema), signIn);
userRouter.get('/users/me', validateToken(process.env.SESSION_TOKEN_KEY || 'signintoken'), getUserInfo);
userRouter.get('/ranking', getRanking);

export default userRouter;
