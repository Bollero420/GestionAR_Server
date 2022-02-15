import Group from '../models/group';
import { Request, Response } from 'express';

const createGroup = async (req: Request, res: Response) => {
  const { group_name, users, actions } = req.body;

  const newGroup = new Group({
    group_name,
    users,
    actions,
  });

  try {
    const savedGroup = await newGroup.save();
    if (savedGroup) {
      res.status(200).json('Group added!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const getGroups = async (req: Request, res: Response) => {
  try {
    const groups = Group.find();
    if (groups) {
      res.status(200).json(groups);
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const getGroupById = async (req: Request, res: Response) => {
  try {
    const group = Group.findById(req.params.id);
    if (group) {
      res.status(200).json(group);
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const updateGroup = async (req: Request, res: Response) => {
  try {
    const group = Group.findByIdAndUpdate(req.params.id, req.body);
    if (group) {
      res.status(200).json('Group updated!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const deleteGroup = async (req: Request, res: Response) => {
  try {
    const group = Group.findByIdAndRemove(req.params.id);
    if (group) {
      res.status(200).json('Group deleted!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

export default {
  createGroup,
  getGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
};
