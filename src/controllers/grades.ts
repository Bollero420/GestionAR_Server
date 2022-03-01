import Grade from '../models/grade';
import { Request, Response } from 'express';

const createGrade = async (req: Request, res: Response) => {
  const { shift, section, level, teachers, students } = req.body;

  const newGrade = new Grade({
    shift,
    section,
    level,
    teachers,
    students,
  });

  try {
    const savedGrade = await newGrade.save();
    if (savedGrade) {
      res.status(200).json('Grade added!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const getGrades = async (req: Request, res: Response) => {
  try {
    const grades = await Grade.find();
    if (grades.length > 1) {
      res.status(200).json(grades);
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const getGradeById = async (req: Request, res: Response) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (grade) {
      res.status(200).json(grade);
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const updateGrade = async (req: Request, res: Response) => {
  try {
    const grade = await Grade.findByIdAndUpdate(req.params.id, req.body);
    if (grade) {
      res.status(200).json('Grade updated!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const deleteGrade = async (req: Request, res: Response) => {
  try {
    const grade = await Grade.findByIdAndRemove(req.params.id);
    if (grade) {
      res.status(200).json('Grade deleted!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

export default {
  createGrade,
  getGrades,
  getGradeById,
  updateGrade,
  deleteGrade,
};
