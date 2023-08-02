import Jwt from "jsonwebtoken";

export const createToken = (data, key) => {
  return Jwt.sign(data, key);
};

export const verifyToken = (token, key) => {
  return Jwt.verify(token, key);
}