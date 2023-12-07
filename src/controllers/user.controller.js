import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

import { getUserData, getUsersByVisitCount } from "../repositories/user.repository.js";
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
  try {
    const result = await getUsersByVisitCount();

    return res.send(result.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}