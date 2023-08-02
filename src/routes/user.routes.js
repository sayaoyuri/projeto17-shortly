import { Router } from "express";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import { signUpSchema } from "../schemas/user.schema.js";
import { signUp } from "../controllers/user.controller.js";

const userRouter = Router();
userRouter.post('/signup', validateSchema(signUpSchema), signUp);

export default userRouter;