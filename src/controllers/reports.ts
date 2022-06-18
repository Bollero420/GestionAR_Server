import { Grade } from '../models';

import {
  generateBiMonthlyReport,
  generateInitialAnnuallyReport,
  generateMonthlyReport,
  generateFinalAnnuallyReport,
} from '../helpers/reports/generators';

const monthlyReport = async (req: any, res: any) => {
  try {
    const { month, year } = req.query;
    let report: any = [];

    const grades = await Grade.find({ section: 'A', shift: 'M' }).lean(true);

    for (let index = 0; index < grades.length; index++) {
      const grade_id = grades[index]._id;
      const data = generateMonthlyReport(month, year, grade_id);
      report = [...report, { grade_id, data }];
    }
    res.status(200).json({
      data: report,
      month,
      year,
    });
  } catch (error) {
    res.status(500).json('Error: ' + error);
  }
};

const bimonthlyReport = async (req: any, res: any) => {
  try {
    const { month, year, grade_id } = req.query;
    let report: any = [];

    const gradeDoc = await Grade.findById(grade_id);

    for (let index = 0; index < gradeDoc.students.length; index++) {
      const studentId = gradeDoc.students[index];

      const data = generateBiMonthlyReport(month, year, studentId);
      report = [...report, { studentId, data }];
    }

    res.status(200).json({
      data: report,
      month,
      year,
      grade_id,
    });
  } catch (error) {
    res.status(500).json('Error: ' + error);
  }
};

const initialAnnuallyReport = async (req: any, res: any) => {
  try {
    const report = generateInitialAnnuallyReport();
    res.status(200).json({
      data: report,
    });
  } catch (error) {
    res.status(500).json('Error: ' + error);
  }
};

const finalAnnuallyReport = async (req: any, res: any) => {
  try {
    const report = generateFinalAnnuallyReport();
    res.status(200).json({
      data: report,
    });
  } catch (error) {
    res.status(500).json('Error: ' + error);
  }
};

export default {
  monthlyReport,
  bimonthlyReport,
  initialAnnuallyReport,
  finalAnnuallyReport,
};
