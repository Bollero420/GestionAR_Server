import { NextFunction, Request, Response } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

import { ACCESS_TOKEN_HEADER } from '../utils/constants';
import { User, Logger } from '../models';

const { JWT_ACCESS_KEY } = process.env;

export const authenticatedRoutes = (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies && req.cookies[ACCESS_TOKEN_HEADER];

    if (token) {
      jwt.verify(token, JWT_ACCESS_KEY, async (err: VerifyErrors, decoded: any) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid Token' });
        } else {
          const user = await User.findById(decoded.userId);
          req.currentUser = user;
          // add logger for url and request information. Display username.
          next();
        }
      });
    } else {
      res.status(401).send({
        message: 'Token not found',
      });
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};
