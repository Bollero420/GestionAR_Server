import { Grade } from '../models';

import { MonthlyReport } from '../types';
import { IGrade, IStudent } from '../types/interfaces';

import {
  generateBiMonthlyReport,
  generateInitialAnnuallyReport,
  generateMonthlyReport,
  generateFinalAnnuallyReport,
} from '../helpers/reports/generators';

import { parseGradeName } from '../helpers';

const monthlyReport = async (req: any, res: any) => {
  try {
    const { month, year } = req.query;

    let results: {
      grade_id: string;
      data: MonthlyReport;
    }[] = [];

    const grades = await Grade.find({ section: 'A', shift: 'M' }, {}, { sort: { level: 1 } }).lean(true);

    for (let index = 0; index < grades.length; index++) {
      const grade_id = grades[index]._id;
      const data = await generateMonthlyReport(month, year, grade_id);
      results = [...results, { grade_id, data }];
    }

    const reports = results.reduce((acc, current) => {
      const reportData = current.data;
      const gradeData: IGrade = grades.find((g) => g._id === current.grade_id) as IGrade;

      return [
        ...acc,
        {
          ...reportData,
          gradeAndSection: parseGradeName(gradeData),
          shift: gradeData.shift,
        },
      ];
    }, [] as any);

    res.status(200).json({
      data: reports,
      grades: results.map((r) => r.grade_id),
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

    const gradeDoc = await Grade.findById(grade_id).populate('students').lean(true);

    for (let index = 0; index < gradeDoc.students.length; index++) {
      const student = gradeDoc.students[index] as unknown as IStudent;

      const data = await generateBiMonthlyReport(month, year, student);
      report = [...report, data];
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
