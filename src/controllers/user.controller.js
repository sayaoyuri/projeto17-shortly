import bcrypt from 'bcrypt';
import { createUser } from "../repositories/user.repository.js";

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