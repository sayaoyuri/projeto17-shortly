import bcrypt from 'bcrypt';
import { userRespository } from '../repositories/user.repository.js';
import { conflictError } from '../errors/conflict.error.js'

async function signUp({name, email, password }) {
  const { rowCount: existingUserCount } = await userRespository.getUser(email);
  console.log(existingUserCount);
  if(existingUserCount !== 0) throw conflictError('E-mail');

  const hashedPassword = bcrypt.hashSync(password, 10);

  await userRespository.createUser(name, email, hashedPassword);
};

export const userService = { signUp };