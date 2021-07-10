import Form from '../models/form';
import { Request, Response } from 'express';

const createForm = async (req: Request, res: Response) => {
  const { form_name } = req.body;

  const newForm = new Form({
    form_name
  });

  try {
    const savedForm = await newForm.save();
    if (savedForm) {
      res.json('Form added!')
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const getForms = async (req: Request, res: Response) => {
  try {
    const forms = Form.find();
    if (forms) {
      res.json(forms)
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const getFormById = async (req: Request, res: Response) => {
  try {
    const form = Form.findById(req.params.id);
    if (form) {
      res.json(form)
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const updateForm = async (req: Request, res: Response) => {
  try {
    const form = Form.findByIdAndUpdate(req.params.id, req.body);
    if (form) {
      res.json('Form updated!')
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const deleteForm = async (req: Request, res: Response) => {
  try {
    const form = Form.findByIdAndRemove(req.params.id);
    if (form) {
      res.json('Form deleted!')
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

export default {
  createForm,
  getForms,
  getFormById,
  updateForm,
  deleteForm
};