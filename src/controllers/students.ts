import Student from '../models/student';
import { Request, Response } from 'express';

const createStudent = async (req: Request, res: Response) => {
  const {
    grade_id,
    integrated,
    entry_date,
    egress_date,
    registration_number,
    previous_school,
    neighborhood,
    cooperator,
    school_radio,
    disability_type,
    medical_center,
    school_dining,
    milk_cup,
    repeating_quantity,
    student_tutors,
    firstName,
    lastName,
    phone,
    birth_date,
    dni,
    country,
    address,
    gender,
    alternative_phone,
    user_id
  } = req.body;

  const newStudent = new Student({
    grade_id,
    integrated,
    entry_date,
    egress_date,
    registration_number,
    previous_school,
    neighborhood,
    cooperator,
    school_radio,
    disability_type,
    medical_center,
    school_dining,
    milk_cup,
    repeating_quantity,
    student_tutors,
    firstName,
    lastName,
    phone,
    birth_date,
    dni,
    country,
    address,
    gender,
    alternative_phone,
    user_id
  });

  try {
    const savedStudent = await newStudent.save();
    if (savedStudent) {
      res.json('Student added!')
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const getStudents = async (req: Request, res: Response) => {
  try {
    const students = Student.find();
    if (students) {
      res.json(students)
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = Student.findById(req.params.id);
    if (student) {
      res.json(student)
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const updateStudent = async (req: Request, res: Response) => {
  try {
    const student = Student.findByIdAndUpdate(req.params.id, req.body);
    if (student) {
      res.json('Student updated!')
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = Student.findByIdAndRemove(req.params.id);
    if (student) {
      res.json('Student deleted!')
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

export default {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};