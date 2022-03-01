import { Request, Response } from 'express';

import Attendance from '../models/attendance';
import Grade from '../models/grade';

const createAttendance = async (req: Request, res: Response) => {
  try {
    const { attendances } = req.body;

    for (let index = 0; index < attendances.length; index++) {
      const attendance = attendances[index];

      const { student_id, subject_id, state } = attendance;

      const newAttendance = new Attendance({
        student_id,
        subject_id,
        state,
      });

      await newAttendance.save();
    }

    res.status(200).json('Attendances created!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const getAttendances = async (req: Request, res: Response) => {
  try {
    const { gradeId, subjectId, date } = req.query;

    const formattedDate = new Date(date.toString());
    const year = formattedDate.getFullYear();
    const month = formattedDate.getMonth();
    const day = formattedDate.getDay();

    const previousMonth = day === 1 ? month - 1 : month;
    const previousYear = day === 1 && month === 0 ? year - 1 : year;
    const previousMountAmountOfDays = day === 1 ? new Date(previousYear, month, 0).getDate() : day - 1;

    const gradeDoc = await Grade.findById(gradeId).populate('students');

    const studentIds = gradeDoc.students.map((s: any) => s._id);

    const attendances = await Attendance.find({
      createdAt: {
        $gte: new Date(previousYear, previousMonth, previousMountAmountOfDays),
        $lt: new Date(year, month, day),
      },
      student_id: { $in: studentIds },
      subjectId,
    }).populate('student_id');

    if (attendances.length > 0) {
      const result = attendances.map((attendance: any) => ({
        _id: attendance._id,
        student_id: attendance.student_id._id,
        student_name: attendance.student_id.lastName + ', ' + attendance.student_id.firstName,
        registration_number: attendance.student_id.registration_number,
        state: attendance.state,
      }));

      res.status(200).json({ attendances: result, isEdit: true });
    } else {
      const result = gradeDoc.students.map((student: any) => ({
        _id: null,
        student_id: student._id,
        student_name: student.lastName + ', ' + student.firstName,
        registration_number: student.registration_number,
        state: false,
      }));
      res.status(200).json({ attendances: result, isEdit: false });
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const getAttendanceById = async (req: Request, res: Response) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (attendance) {
      res.status(200).json(attendance);
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const updateAttendance = async (req: Request, res: Response) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body);
    if (attendance) {
      res.status(200).json('Attendance updated!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const updateAttendances = async (req: Request, res: Response) => {
  try {
    const { attendances } = req.body;

    for (let index = 0; index < attendances.length; index++) {
      const attendance = attendances[index];

      await Attendance.findByIdAndUpdate(attendance._id, attendance);
    }
    res.status(200).json('Attendances updated!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const deleteAttendance = async (req: Request, res: Response) => {
  try {
    const attendance = await Attendance.findByIdAndRemove(req.params.id);
    if (attendance) {
      res.status(200).json('Attendance deleted!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

export default {
  getAttendances,
  createAttendance,
  getAttendanceById,
  updateAttendance,
  updateAttendances,
  deleteAttendance,
};
