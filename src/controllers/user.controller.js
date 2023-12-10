import dotenv from 'dotenv';
dotenv.config();

import { userService } from '../services/user.service.js';

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  await userService.signUp({ name, email, password });

  return res.sendStatus(201);
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const token = await userService.signIn({ email, password });

  return res.send({ token });
};

export const getUserInfo = async (req, res) => {
  const { id } = res.locals.token;

  const userInfo = await userService.findUserInfo({ id });

  return res.status(200).send(userInfo);
};

export const getRanking = async (req, res) => {
  const ranking = await userService.findUsersByVisitCount();

  return res.status(200).send(ranking);
};
