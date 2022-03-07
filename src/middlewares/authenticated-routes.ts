import { NextFunction, Request, Response } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

import { ACCESS_TOKEN_HEADER } from '../utils/constants';
import User from '../models/user';

const { JWT_ACCESS_KEY } = process.env;

export const authenticatedRoutes = (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies && req.cookies[ACCESS_TOKEN_HEADER];

    if (token) {
      jwt.verify(token, JWT_ACCESS_KEY, async (err: VerifyErrors, decoded: any) => {
        if (err) {
          return res.status(404).json({ message: 'Invalid Token' });
        } else {
          const user = await User.findById(decoded.ussssssssssssssssssrId);
          req.currentUser = user;
          next();
        }
      });
    } else {
      res.status(404).send({
        message: 'Token not found',
      });
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};