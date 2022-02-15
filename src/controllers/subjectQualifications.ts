import SubjectQualification from '../models/subjectQualification';
import { Request, Response } from 'express';

const createSubjectQualification = async (req: Request, res: Response) => {
  const { student_id, subject_id, bimonthly_date, value } = req.body;

  const newSubjectQualification = new SubjectQualification({
    student_id,
    subject_id,
    bimonthly_date,
    value,
  });

  try {
    const savedSubjectQualification = await newSubjectQualification.save();
    if (savedSubjectQualification) {
      res.status(200).json('SubjectQualification added!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const getSubjectQualifications = async (req: Request, res: Response) => {
  try {
    const subjectQualifications = SubjectQualification.find();
    if (subjectQualifications) {
      res.status(200).json(subjectQualifications);
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const getSubjectQualificationById = async (req: Request, res: Response) => {
  try {
    const subjectQualification = SubjectQualification.findById(req.params.id);
    if (subjectQualification) {
      res.status(200).json(subjectQualification);
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const updateSubjectQualification = async (req: Request, res: Response) => {
  try {
    const subjectQualification = SubjectQualification.findByIdAndUpdate(req.params.id, req.body);
    if (subjectQualification) {
      res.status(200).json('SubjectQualification updated!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const deleteSubjectQualification = async (req: Request, res: Response) => {
  try {
    const subjectQualification = SubjectQualification.findByIdAndRemove(req.params.id);
    if (subjectQualification) {
      res.status(200).json('SubjectQualification deleted!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

export default {
  createSubjectQualification,
  getSubjectQualifications,
  getSubjectQualificationById,
  updateSubjectQualification,
  deleteSubjectQualification,
};
