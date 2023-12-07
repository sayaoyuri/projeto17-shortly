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
  try {
    const { id } = res.locals.token;

    const result = await getUserData(id);

    return res.send(result.rows[0]);
  } catch (error) {
    return res.status(500).send(error.message)
  };
};

export const getRanking = async (req, res) => {
  try {
    const result = await getUsersByVisitCount();

    return res.send(result.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}