import Form from '../models/form';
import { Request, Response } from 'express';

const createForm = async (req: Request, res: Response) => {
  const { form_name } = req.body;

  const newForm = new Form({
    form_name,
  });

  try {
    const savedForm = await newForm.save();
    if (savedForm) {
      res.status(200).json('Form added!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const getForms = async (req: Request, res: Response) => {
  try {
    const forms = await Form.find();
    if (forms) {
      res.status(200).json(forms);
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const getFormById = async (req: Request, res: Response) => {
  try {
    const form = await Form.findById(req.params.id);
    if (form) {
      res.status(200).json(form);
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const updateForm = async (req: Request, res: Response) => {
  try {
    const form = await Form.findByIdAndUpdate(req.params.id, req.body);
    if (form) {
      res.status(200).json('Form updated!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const deleteForm = async (req: Request, res: Response) => {
  try {
    const form = await Form.findByIdAndRemove(req.params.id);
    if (form) {
      res.status(200).json('Form deleted!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

export default {
  createForm,
  getForms,
  getFormById,
  updateForm,
  deleteForm,
};
