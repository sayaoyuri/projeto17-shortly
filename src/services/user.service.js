import bcrypt from 'bcrypt';
import { userRespository } from '../repositories/user.repository.js';
import { conflictError } from '../errors/conflict.error.js'
import { unauthorizedError } from '../errors/unauthorized.error.js';
import { generateToken } from '../middlewares/auth.middleware.js';
import { sessionRepository } from '../repositories/session.repository.js';

async function signUp({name, email, password }) {
  const { rowCount: existingUserCount } = await userRespository.getUser(email);
  if(existingUserCount !== 0) throw conflictError('E-mail');

  const hashedPassword = bcrypt.hashSync(password, 10);

  await userRespository.createUser(name, email, hashedPassword);
};

async function signIn({ email, password }) {
  const existingUser = await userRespository.getUser(email);
  if(existingUser.rowCount === 0) throw unauthorizedError();

  const comparePasswordHash = bcrypt.compareSync(password, existingUser.rows[0].password);
  if(!comparePasswordHash) throw unauthorizedError();
  
  const { id, name } = existingUser.rows[0];
  const userData = { id, name, email };
  const token = generateToken(userData, process.env.SESSION_TOKEN_KEY || 'signintoken');

  await sessionRepository.saveToken(userData.id, token);

  return token;
}

export const userService = { signUp, signIn };