import { Request, Response } from 'express';

import { SubjectQualification, Grade } from '../models';

import { useDateHelpersByDate } from '../helpers';

const createSubjectQualification = async (req: Request, res: Response) => {
  const { student_id, subject_id, bimonthly_date, value } = req.body;

  const newSubjectQualification = new SubjectQualification({
    student_id,
    subject_id,
    bimonthly_date,
    value,
  });

  try {
    const savedSubjectQualification = await newSubjectQualification.save();
    if (savedSubjectQualification) {
      res.status(200).json('SubjectQualification added!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const getSubjectQualifications = async (req: Request, res: Response) => {
  try {
    const { gradeId, subjectId, date } = req.query;

    const { year, month, nextYear, nextMonth } = useDateHelpersByDate(date.toString());

    const gradeDoc = await Grade.findById(gradeId).populate('students');
    const studentIds = gradeDoc.students.map((s: any) => s._id);

    const qualifications = await SubjectQualification.find({
      bimonthly_date: {
        $gte: new Date(year, month),
        $lt: new Date(nextYear, nextMonth),
      },
      student_id: { $in: studentIds },
      subjectId,
    }).populate('student_id');

    if (qualifications.length > 0) {
      const result = qualifications.map((qualification: any) => ({
        student_id: qualification.student_id._id,
        student_name: qualification.student_id.lastName + ', ' + qualification.student_id.firstName,
        registration_number: qualification.student_id.registration_number,
        qualification: qualification.value,
      }));

      res.status(200).json({ qualifications: result, isEdit: true });
    } else {
      const result = gradeDoc.students.map((student: any) => ({
        student_id: student._id,
        student_name: student.lastName + ', ' + student.firstName,
        registration_number: student.registration_number,
        qualification: null,
      }));
      res.status(200).json({ qualifications: result, isEdit: false });
    }

    const subjectQualifications = await SubjectQualification.find();
    if (subjectQualifications) {
      res.status(200).json(subjectQualifications);
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const getSubjectQualificationById = async (req: Request, res: Response) => {
  try {
    const subjectQualification = await SubjectQualification.findById(req.params.id);
    if (subjectQualification) {
      res.status(200).json(subjectQualification);
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const updateSubjectQualification = async (req: Request, res: Response) => {
  try {
    const subjectQualification = await SubjectQualification.findByIdAndUpdate(req.params.id, req.body);
    if (subjectQualification) {
      res.status(200).json('Qualification updated!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const updateSubjectQualifications = async (req: Request, res: Response) => {
  try {
    const { qualifications } = req.body;

    for (let index = 0; index < qualifications.length; index++) {
      const qualification = qualifications[index];

      await SubjectQualification.findByIdAndUpdate(qualification._id, qualification);
    }
    res.status(200).json('Qualifications updated!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const deleteSubjectQualification = async (req: Request, res: Response) => {
  try {
    const subjectQualification = await SubjectQualification.findByIdAndRemove(req.params.id);
    if (subjectQualification) {
      res.status(200).json('SubjectQualification deleted!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

export default {
  createSubjectQualification,
  getSubjectQualifications,
  getSubjectQualificationById,
  updateSubjectQualification,
  updateSubjectQualifications,
  deleteSubjectQualification,
};
