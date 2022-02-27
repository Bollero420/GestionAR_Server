import Action from '../models/action';
import { Request, Response } from 'express';

const createAction = async (req: Request, res: Response) => {
  const { action_name, form_id } = req.body;

  const newAction = new Action({
    action_name,
    form_id,
  });

  try {
    const savedAction = await newAction.save();
    if (savedAction) {
      res.status(200).json('Action added!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const getActions = async (req: Request, res: Response) => {
  try {
    const actions = await Action.find();
    if (actions) {
      res.status(200).json(actions);
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const getActionById = async (req: Request, res: Response) => {
  try {
    const action = await Action.findById(req.params.id);
    if (action) {
      res.status(200).json(action);
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const updateAction = async (req: Request, res: Response) => {
  try {
    const action = await Action.findByIdAndUpdate(req.params.id, req.body);
    if (action) {
      res.status(200).json('Action updated!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const deleteAction = async (req: Request, res: Response) => {
  try {
    const action = await Action.findByIdAndRemove(req.params.id);
    if (action) {
      res.status(200).json('Action deleted!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

export default {
  getActions,
  createAction,
  getActionById,
  updateAction,
  deleteAction,
};
