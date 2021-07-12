import User from '../models/user';
import { Request, Response } from 'express';
import jwt  from 'jsonwebtoken';

const signIn = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const logUser = await User.findOne({
    $or: [
      { username },
      { password }
    ],
  });

  const payload = {
    check:  true,
    user_id: logUser.id
   };

  if (logUser) {
    const token = jwt.sign(payload, req.app.get('llave'), {
      expiresIn: 1440
     });
     res.json({
      mensaje: 'Autenticación correcta',
      token
     });
  } else {
    res.status(404).json('Error: User not found')
  }
}

export default {
  signIn,
};