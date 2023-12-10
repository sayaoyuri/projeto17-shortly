import Jwt from 'jsonwebtoken';
import { getToken } from '../repositories/session.repository.js';

export const generateToken = (data, key) => {
  return Jwt.sign(data, key);
};

export const validateToken = (SECRET_KEY) => {
  return async (req, res, next) => {
    if (!req.headers.authorization) return res.sendStatus(401);

    const token = req.headers.authorization?.replace('Bearer ', '');

    const isTokenExist = await getToken(String(token));
    if (isTokenExist.rowCount === 0) return res.sendStatus(401);

    res.locals.token = Jwt.verify(token, SECRET_KEY);

    next();
  };
};
