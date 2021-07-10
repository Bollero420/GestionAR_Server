import Attendance from '../models/attendance';
import { Request, Response } from 'express';

const createAttendance = async (req: Request, res: Response) => {
  const { student_id, subject_id, state } = req.body;

  const newAttendance = new Attendance({
    student_id,
    subject_id,
    state
  });

  try {
    const savedAttendance = await newAttendance.save();
    if (savedAttendance) {
      res.json('Attendance added!')
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const getAttendances = async (req: Request, res: Response) => {
  try {
    const actions = Attendance.find();
    if (actions) {
      res.json(actions)
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const getAttendanceById = async (req: Request, res: Response) => {
  try {
    const attendance = Attendance.findById(req.params.id);
    if (attendance) {
      res.json(attendance)
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const updateAttendance = async (req: Request, res: Response) => {
  try {
    const attendance = Attendance.findByIdAndUpdate(req.params.id, req.body);
    if (attendance) {
      res.json('Attendance updated!')
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const deleteAttendance = async (req: Request, res: Response) => {
  try {
    const attendance = Attendance.findByIdAndRemove(req.params.id);
    if (attendance) {
      res.json('Attendance deleted!')
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

export default {
  getAttendances,
  createAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance
};