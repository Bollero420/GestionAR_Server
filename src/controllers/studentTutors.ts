import StudentTutor from '../models/studentTutor';
import { Request, Response } from 'express';

const createStudentTutor = async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    phone,
    birth_date,
    dni,
    country,
    address,
    gender,
    alternative_phone,
    user_id,
    students,
    job,
    civil_status,
    educational_level,
  } = req.body;

  const newStudentTutor = new StudentTutor({
    firstName,
    lastName,
    phone,
    birth_date,
    dni,
    country,
    address,
    gender,
    alternative_phone,
    user_id,
    students,
    job,
    civil_status,
    educational_level,
  });

  try {
    const savedStudentTutor = await newStudentTutor.save();
    if (savedStudentTutor) {
      res.status(200).json('StudentTutor added!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const getStudentTutors = async (req: Request, res: Response) => {
  try {
    const studentTutors = StudentTutor.find();
    if (studentTutors) {
      res.status(200).json(studentTutors);
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const getStudentTutorById = async (req: Request, res: Response) => {
  try {
    const studentTutor = StudentTutor.findById(req.params.id);
    if (studentTutor) {
      res.status(200).json(studentTutor);
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const updateStudentTutor = async (req: Request, res: Response) => {
  try {
    const studentTutor = StudentTutor.findByIdAndUpdate(req.params.id, req.body);
    if (studentTutor) {
      res.status(200).json('StudentTutor updated!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const deleteStudentTutor = async (req: Request, res: Response) => {
  try {
    const studentTutor = StudentTutor.findByIdAndRemove(req.params.id);
    if (studentTutor) {
      res.status(200).json('StudentTutor deleted!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

export default {
  createStudentTutor,
  getStudentTutors,
  getStudentTutorById,
  updateStudentTutor,
  deleteStudentTutor,
};
