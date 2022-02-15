import User from '../models/user';
import { Request, Response } from 'express';

const createUser = async (req: Request, res: Response) => {
  const { username, firstName, lastName, password } = req.body;

  const newUser = new User({
    username,
    firstName,
    lastName,
    password,
  });

  try {
    const savedUser = await newUser.save();
    if (savedUser) {
      res.status(200).json('User added!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = User.find();
    if (users) {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const user = User.findByIdAndUpdate(req.params.id, req.body);
    if (user) {
      res.status(200).json('User updated!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = User.findByIdAndRemove(req.params.id);
    if (user) {
      res.status(200).json('User deleted!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

export default {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
