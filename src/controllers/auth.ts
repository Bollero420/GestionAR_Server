import User from '../models/user';
import { Request, Response } from 'express';
import jwt, { verify, VerifyErrors } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
  ACCESS_TOKEN_HEADER,
  ACCESS_MAX_AGE_SECONDS,
  ACCESS_MAX_AGE_MILI_SECONDS,
  REFRESH_TOKEN_HEADER,
  REFRESH_MAX_AGE_SECONDS,
  REFRESH_MAX_AGE_MILI_SECONDS,
} from '../utils/constants';

const { JWT_ACCESS_KEY, JWT_REFRESH_KEY } = process.env;

const createAccessToken = (userId: string) =>
  jwt.sign({ userId }, JWT_ACCESS_KEY, {
    expiresIn: ACCESS_MAX_AGE_SECONDS,
  });

const createRefreshToken = (userId: string) =>
  jwt.sign({ userId }, JWT_REFRESH_KEY, {
    expiresIn: REFRESH_MAX_AGE_SECONDS,
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
        const access_token = createAccessToken(logUser._id);
        const refresh_token = createRefreshToken(logUser._id);

        res.cookie(REFRESH_TOKEN_HEADER, refresh_token, { httpOnly: true, maxAge: REFRESH_MAX_AGE_MILI_SECONDS });
        res.cookie(ACCESS_TOKEN_HEADER, access_token, { httpOnly: true, maxAge: ACCESS_MAX_AGE_MILI_SECONDS });

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
    res.cookie(ACCESS_TOKEN_HEADER, '', { maxAge: 1 });
    res.status(200);
  } catch (error) {
    res.status(400).json(`Error: ${error.message}`);
  }
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies[REFRESH_TOKEN_HEADER];
    jwt.verify(token, JWT_REFRESH_KEY, async (err: VerifyErrors, decoded: any) => {
      if (err) {
        return res.status(404).json({ message: 'Invalid Refresh Token' });
      } else {
        const { userId } = decoded;

        const access_token = createAccessToken(userId);
        const refresh_token = createRefreshToken(userId);

        res.cookie(REFRESH_TOKEN_HEADER, refresh_token, { httpOnly: true, maxAge: REFRESH_MAX_AGE_MILI_SECONDS });
        res.cookie(ACCESS_TOKEN_HEADER, access_token, { httpOnly: true, maxAge: ACCESS_MAX_AGE_MILI_SECONDS });
      }
    });
  } catch (error) {
    res.status(400).json(`Error: ${error.message}`);
  }
};

export default {
  signIn,
  signOut,
  refreshToken,
};
