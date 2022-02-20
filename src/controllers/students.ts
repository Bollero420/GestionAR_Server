import { Request, Response } from 'express';

import Student from '../models/student';
import StudentTutor from '../models/studentTutor';
import Grade from '../models/grade';

const getGradeId = async (gradeData: any) =>
  await Grade.findOne({
    shift: gradeData.shift,
    section: gradeData.section,
    level: gradeData.level,
  });

const createStudent = async (req: Request, res: Response) => {
  try {
    const {
      siblings,
      grade,
      student_tutors,
      firstName,
      lastName,
      dni,
      emailAddress,
      gender,
      birth_date,
      location,
      country,
      previous_school,
      integrated,
      repeating_quantity,
      address,
      floor,
      apartment,
      neighborhood,
      address_location,
      phone,
      alternative_phone,
      school_radio,
      medical_center,
      disability,
      school_dining,
      cooperator,
      disability_type,
    } = req.body;

    // initialize array of savedStudentTutors
    let savedTutors: any[] = [];
    let savedStudents: any[] = [];

    // create student tutors
    for (let index = 0; index < student_tutors.length; index++) {
      const tutorFromData = student_tutors[index];

      const data = {
        firstName: tutorFromData.firstName,
        lastName: tutorFromData.lastName,
        phone: tutorFromData.phone,
        birth_date: tutorFromData.birth_date,
        dni: tutorFromData.dni,
        location: tutorFromData.location,
        address: tutorFromData.address,
        gender: tutorFromData.gender,
        alternative_phone: tutorFromData.alternative_phone,
        job: tutorFromData.job,
        civil_status: tutorFromData.civil_status,
        educational_level: tutorFromData.educational_level,
        other_info: tutorFromData.other_info,
      };

      const dbTutor = new StudentTutor(data);

      const savedTutor = dbTutor.save();

      // store in array saved values for students.
      savedTutors = [...savedTutors, savedTutor];
    }

    // set default values for siblings and main student
    const student_common_data: any = {
      student_tutors: savedTutors.map((sT) => sT._id),
      emailAddress,
      location,
      country,
      previous_school,
      integrated,
      repeating_quantity,
      address_location,
      phone,
      alternative_phone,
      school_radio,
      medical_center,
      cooperator,
      has_siblings: siblings?.length > 0,
      neighborhood,
      address,
      floor,
      apartment,
    };

    // handle school_dining option
    switch (school_dining) {
      case '1':
        student_common_data.milk_cup = true;
        student_common_data.school_dining = false;
        break;
      case '2':
        student_common_data.milk_cup = false;
        student_common_data.school_dining = true;
        break;
      case '3':
        student_common_data.milk_cup = true;
        student_common_data.school_dining = true;
        break;
    }

    // get corresponding grade
    const gradeDoc = await getGradeId(grade);

    // create main student
    const newStudent = await Student.create({
      ...student_common_data,
      entry_date: new Date(),
      registration_number: dni,
      firstName,
      lastName,
      gender,
      birth_date,
      disability,
      disability_type,
      dni,
      grade_id: gradeDoc._id,
    });

    savedStudents = [...savedStudents, newStudent];

    // add student to grade
    gradeDoc.students = [...gradeDoc.students, newStudent._id];
    await gradeDoc.save();

    // create siblings
    for (let index = 0; index < siblings.length; index++) {
      const sibling = siblings[index];

      // get corresponding grade
      const gradeDoc = await getGradeId(grade);

      // create sibling student
      const newStudent = Student.create({
        ...student_common_data,
        entry_date: new Date(),
        registration_number: sibling.dni,
        firstName: sibling.firstName,
        lastName: sibling.lastName,
        gender: sibling.gender,
        birth_date: sibling.birth_date,
        grade_id: gradeDoc._id,
      });

      // save sibling student
      savedStudents = [...savedStudents, newStudent];
    }

    // updated studentTutor with objectIds
    for (let index = 0; index < savedTutors.length; index++) {
      const savedTutor = savedTutors[index];

      savedTutor.students = savedStudents.map((sT) => sT._id);
      await savedTutor.save();
    }

    if (newStudent && savedTutors.length > 0) {
      res.status(200).json('Student added!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const getStudents = async (req: Request, res: Response) => {
  try {
    const students = Student.find();
    if (students) {
      res.status(200).json(students);
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = Student.findById(req.params.id);
    if (student) {
      res.status(200).json(student);
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const updateStudent = async (req: Request, res: Response) => {
  try {
    const student = Student.findByIdAndUpdate(req.params.id, req.body);
    if (student) {
      res.status(200).json('Student updated!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = Student.findByIdAndRemove(req.params.id);
    if (student) {
      res.status(200).json('Student deleted!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

export default {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
