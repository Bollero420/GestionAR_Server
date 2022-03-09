import { Request, Response } from 'express';

import Teacher from '../models/teacher';

import { userFactory } from '../helpers/db';

const createTeacher = async (req: Request, res: Response) => {
  try {
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
      main_teacher,
      emailAddress,
      location,
    } = req.body;

    const savedTeacher = await Teacher.create({
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
      main_teacher,
      email_address: emailAddress,
      location,
    });

    //! create user after student is created
    userFactory('teacher', savedTeacher);

    if (savedTeacher) {
      res.status(200).json('Teacher added!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const getTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await Teacher.find();
    if (teachers) {
      res.status(200).json(teachers);
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const getTeacherById = async (req: Request, res: Response) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (teacher) {
      res.status(200).json(teacher);
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const updateTeacher = async (req: Request, res: Response) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body);
    if (teacher) {
      res.status(200).json('Teacher updated!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const deleteTeacher = async (req: Request, res: Response) => {
  try {
    const teacher = await Teacher.findByIdAndRemove(req.params.id);
    if (teacher) {
      res.status(200).json('Teacher deleted!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

export default {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};
