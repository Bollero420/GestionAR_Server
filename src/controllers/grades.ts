import Grade from '../models/grade';
import { Request, Response } from 'express';

const createGrade = async (req: Request, res: Response) => {
  const { shift,
    section,
    level,
    teachers,
    students } = req.body;

  const newGrade = new Grade({
    shift,
    section,
    level,
    teachers,
    students
  });

  try {
    const savedGrade = await newGrade.save();
    if (savedGrade) {
      res.json('Grade added!')
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const getGrades = async (req: Request, res: Response) => {
  try {
    const grades = Grade.find();
    if (grades) {
      res.json(grades)
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const getGradeById = async (req: Request, res: Response) => {
  try {
    const grade = Grade.findById(req.params.id);
    if (grade) {
      res.json(grade)
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const updateGrade = async (req: Request, res: Response) => {
  try {
    const grade = Grade.findByIdAndUpdate(req.params.id, req.body);
    if (grade) {
      res.json('Grade updated!')
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const deleteGrade = async (req: Request, res: Response) => {
  try {
    const grade = Grade.findByIdAndRemove(req.params.id);
    if (grade) {
      res.json('Grade deleted!')
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

export default {
  createGrade,
  getGrades,
  getGradeById,
  updateGrade,
  deleteGrade
};