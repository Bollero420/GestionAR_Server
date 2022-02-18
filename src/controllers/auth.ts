import User from '../models/user';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { MAX_AGE_SECONDS, MAX_AGE_MILI_SECONDS, TOKEN_HEADER } from '../utils/constants';

const { JSON_WEB_TOKEN_KEY } = process.env;

const createToken = (userId: string) =>
  jwt.sign({ userId }, JSON_WEB_TOKEN_KEY, {
    expiresIn: MAX_AGE_SECONDS,
  });

const signIn = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const logUser = await User.findOne({
      username,
    });

    if (logUser) {
      const isPasswordMatch = bcrypt.compare(password, logUser.password);

      if (isPasswordMatch) {
        const token = createToken(logUser._id);

        res.cookie(TOKEN_HEADER, token, { httpOnly: true, maxAge: MAX_AGE_MILI_SECONDS });

        res.status(200).json({
          message: 'Autenticación correcta',
          userId: logUser._id,
        });
      } else {
        res.status(404).json('Error: Wrong Password');
      }
    } else {
      res.status(404).json('Error: User not found');
    }
  } catch (error) {
    res.status(400).json(`Error: ${error.message}`);
  }
};

const signOut = async (req: Request, res: Response) => {
  try {
    res.cookie(TOKEN_HEADER, '', { maxAge: 1 });
    res.status(200);
  } catch (error) {
    res.status(400).json(`Error: ${error.message}`);
  }
};

export default {
  signIn,
  signOut,
};
