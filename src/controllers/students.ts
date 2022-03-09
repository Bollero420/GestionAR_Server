import { Request, Response } from 'express';
import { Types } from 'mongoose';

import Student from '../models/student';
import StudentTutor from '../models/studentTutor';
import Grade from '../models/grade';
import Observation from '../models/observation';
import SubjectQualification from '../models/subjectQualification';

import { getStudentQualificationAndObservations, userFactory } from '../helpers/db';

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

    // initialize array of savedStudent and Tutors
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
      email_address: emailAddress,
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
      student_tutors: savedTutors.map((sT) => sT._id),
    });

    //! create user after student is created
    userFactory('student', newStudent);

    // add student to grade
    gradeDoc.students = [...gradeDoc.students, newStudent._id];
    await gradeDoc.save();

    // create siblings
    //? TO.DO store siblings data. do not create new students
    //? Should we look for existing student documents if already there, maybe by DNI.
    // for (let index = 0; index < siblings.length; index++) {
    //   const sibling = siblings[index];

    //   // get corresponding grade
    //   const gradeDoc = await getGradeId(grade);

    //   // create sibling student
    //   const newStudent = Student.create({
    //     ...student_common_data,
    //     entry_date: new Date(),
    //     registration_number: sibling.dni,
    //     firstName: sibling.firstName,
    //     lastName: sibling.lastName,
    //     gender: sibling.gender,
    //     birth_date: sibling.birth_date,
    //     grade_id: gradeDoc._id,
    //   });

    //   // save sibling student
    //   savedStudents = [...savedStudents, newStudent];
    // }}

    // updated studentTutor with objectIds
    for (let index = 0; index < savedTutors.length; index++) {
      const savedTutor = savedTutors[index];

      await StudentTutor.findByIdAndUpdate(savedTutor._id, {
        students: [...savedTutor.students, newStudent._id],
      });
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
    const { date, grade_id } = req.query;

    let mappedStudents: any = [];
    const students = await Student.find({ grade_id: grade_id.toString() }).lean(true);

    for (let index = 0; index < students.length; index++) {
      const student = students[index];

      const { isCompleted } = await getStudentQualificationAndObservations(date.toString(), student._id);
      mappedStudents = [...mappedStudents, { ...student, isCompleted }];
    }

    if (mappedStudents.length > 0) {
      res.status(200).json(mappedStudents);
    } else {
      res.status(404).json([]);
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id).populate('grade_id').populate('student_tutors').lean(true);
    if (student) {
      res.status(200).json(student);
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const updateStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body);
    if (student) {
      res.status(200).json('Student updated!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndRemove(req.params.id);
    if (student) {
      res.status(200).json('Student deleted!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const getStudentQualificationsAndObservations = async (req: Request, res: Response) => {
  try {
    const { id: student_id } = req.params;

    const { date } = req.query;

    const response = await getStudentQualificationAndObservations(date.toString(), student_id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const generateStudentQualificationsAndObservations = async (req: Request, res: Response) => {
  try {
    const { id: student_id } = req.params;
    const { qualifications, observation } = req.body;

    for (let index = 0; index < qualifications.length; index++) {
      const qualification = qualifications[index];

      const { subject_id, value, bimonthly_date } = qualification;

      const newQualification = new SubjectQualification({
        student_id,
        subject_id,
        value,
        bimonthly_date,
      });

      await newQualification.save();
    }

    const obs = new Observation({
      student_id,
      description: observation.description,
      worry_and_effort: observation.worry_and_effort,
      respect_rules: observation.respect_rules,
      solidarity_and_collaboration: observation.solidarity_and_collaboration,
      group_responsibility: observation.group_responsibility,
      subject_id: observation.subject_id,
      bimonthly_date: observation.bimonthly_date,
    });

    await obs.save();
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const updateStudentQualificationsAndObservations = async (req: Request, res: Response) => {
  try {
    const { id: student_id } = req.params;
    const { qualifications, observation } = req.body;

    for (let index = 0; index < qualifications.length; index++) {
      const qualification = qualifications[index];

      const { value } = qualification;

      await SubjectQualification.findByIdAndUpdate(
        qualification?._id,
        {
          value,
          student_id: Types.ObjectId(student_id),
          subject_id: Types.ObjectId(qualification.subject_id),
        },
        { upsert: true }
      );
    }

    await Observation.findByIdAndUpdate(
      observation?._id,
      {
        ...observation,
      },
      { upsert: true }
    );
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
  getStudentQualificationsAndObservations,
  generateStudentQualificationsAndObservations,
  updateStudentQualificationsAndObservations,
};
