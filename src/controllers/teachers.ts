import Teacher from '../models/teacher';
import { Request, Response } from 'express';

const createTeacher = async (req: Request, res: Response) => {
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
    grades,
    subjects,
    main_teacher
  } = req.body;

  const newTeacher = new Teacher({
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
    grades,
    subjects,
    main_teacher
  });

  try {
    const savedTeacher = await newTeacher.save();
    if (savedTeacher) {
      res.json('Teacher added!')
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const getTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = Teacher.find();
    if (teachers) {
      res.json(teachers)
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const getTeacherById = async (req: Request, res: Response) => {
  try {
    const teacher = Teacher.findById(req.params.id);
    if (teacher) {
      res.json(teacher)
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const updateTeacher = async (req: Request, res: Response) => {
  try {
    const teacher = Teacher.findByIdAndUpdate(req.params.id, req.body);
    if (teacher) {
      res.json('Teacher updated!')
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const deleteTeacher = async (req: Request, res: Response) => {
  try {
    const teacher = Teacher.findByIdAndRemove(req.params.id);
    if (teacher) {
      res.json('Teacher deleted!')
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

export default {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher
};