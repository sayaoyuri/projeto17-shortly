import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
import { createUser, getUser } from "../repositories/user.repository.js";
import { createToken } from '../auth/createToken.auth.js';
import { saveToken } from '../repositories/session.repository.js';

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    await createUser(name, email, hashedPassword);
  
    return res.sendStatus(201);
  } catch (err) {
    if(err.code === '23505') return res.status(409).send({ message: "O e-mail informado já está em uso!" });

    return res.status(500).send(err.message);
  };
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

    return res.send({ token: `Bearer ${token}` });
  } catch (err) {
    return res.status(500).send(err.message);
  };
};