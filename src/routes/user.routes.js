import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/user.schema.js";
import { signIn, signUp } from "../controllers/user.controller.js";

const userRouter = Router();
userRouter.post('/signup', validateSchema(signUpSchema), signUp);
userRouter.post('/signin', validateSchema(signInSchema), signIn)

export default userRouter;