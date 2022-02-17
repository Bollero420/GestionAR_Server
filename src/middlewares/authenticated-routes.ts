import { NextFunction, Request, Response } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

import { TOKEN_HEADER } from '../utils/constants';
import User from '../models/user';

const { JSON_WEB_TOKEN_KEY } = process.env;

export const authenticatedRoutes = (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies[TOKEN_HEADER];
    if (token) {
      jwt.verify(token, JSON_WEB_TOKEN_KEY, (err: VerifyErrors, decoded: any) => {
        if (err) {
          return res.status(404).json({ message: 'Invalid Token' });
        } else {
          const user = User.findById(decoded.user_id);
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
