import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

import { getUser, getUserData, getUsersByVisitCount } from "../repositories/user.repository.js";
import { createToken } from '../middlewares/auth.middleware.js';
import { saveToken } from '../repositories/session.repository.js';
import { userService } from '../services/user.service.js';

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  await userService.signUp({ name, email, password });

  return res.sendStatus(201);
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await getUser(email);

    const invalidUserMsg = "E-mail e ou senha inválido(os)!";

    if(result.rowCount === 0)return res.status(401).send({ message: invalidUserMsg });
    
    const matchPassword = bcrypt.compareSync(password, result.rows[0].password);
    if(!matchPassword) return res.status(401).send({ message: invalidUserMsg });

    const { id, name } = result.rows[0];
    const userData = { id, name, email };
    const token = createToken(userData, process.env.SESSION_TOKEN_KEY || 'signintoken');

    await saveToken(userData.id, token);

    return res.send({ token });
  } catch (err) {
    return res.status(500).send(err.message);
  };
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