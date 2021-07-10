import Subject from '../models/subject';
import { Request, Response } from 'express';

const createSubject = async (req: Request, res: Response) => {
  const {
    subject_name,
    teachers
  } = req.body;

  const newSubject = new Subject({
    subject_name,
    teachers
  });

  try {
    const savedSubject = await newSubject.save();
    if (savedSubject) {
      res.json('Subject added!')
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const getSubjects = async (req: Request, res: Response) => {
  try {
    const subjects = Subject.find();
    if (subjects) {
      res.json(subjects)
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const getSubjectById = async (req: Request, res: Response) => {
  try {
    const subject = Subject.findById(req.params.id);
    if (subject) {
      res.json(subject)
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const updateSubject = async (req: Request, res: Response) => {
  try {
    const subject = Subject.findByIdAndUpdate(req.params.id, req.body);
    if (subject) {
      res.json('Subject updated!')
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const deleteSubject = async (req: Request, res: Response) => {
  try {
    const subject = Subject.findByIdAndRemove(req.params.id);
    if (subject) {
      res.json('Subject deleted!')
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

export default {
  getSubjects,
  createSubject,
  getSubjectById,
  updateSubject,
  deleteSubject
};