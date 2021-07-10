import Action from '../models/action';
import { Request, Response } from 'express';

const createAction = async (req: Request, res: Response) => {
  const { action_name, form_id } = req.body;

  const newAction = new Action({
    action_name,
    form_id
  });

  try {
    const savedAction = await newAction.save();
    if (savedAction) {
      res.json('Action added!')
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const getActions = async (req: Request, res: Response) => {
  try {
    const actions = Action.find();
    if (actions) {
      res.json(actions)
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const getActionById = async (req: Request, res: Response) => {
  try {
    const action = Action.findById(req.params.id);
    if (action) {
      res.json(action)
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const updateAction = async (req: Request, res: Response) => {
  try {
    const action = Action.findByIdAndUpdate(req.params.id, req.body);
    if (action) {
      res.json('Action updated!')
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const deleteAction = async (req: Request, res: Response) => {
  try {
    const action = Action.findByIdAndRemove(req.params.id);
    if (action) {
      res.json('Action deleted!')
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

export default {
  getActions,
  createAction,
  getActionById,
  updateAction,
  deleteAction
};