import { NextFunction, Request, Response } from 'express';
import jwt, { VerifyErrors }  from 'jsonwebtoken';
import User from '../models/user';
import { APP_KEY_LABEL, TOKEN_HEADER } from '../utils/constants';

export const authenticatedRoutes = (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers[TOKEN_HEADER];
    const key = req.app.get(APP_KEY_LABEL)
  
    if (typeof token === 'string') {
      jwt.verify(token, key, (err: VerifyErrors, decoded: any) => {      
        if (err) {
          return res.json({ mensaje: 'Invalid Token' });    
        } else {
          const user = User.findById(decoded.user_id);
          req.currentUser = user
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Missing Token' 
      });
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
};
