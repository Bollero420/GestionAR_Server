import { Request, Response } from 'express';

import Observation from '../models/observation';

const createObservation = async (req: Request, res: Response) => {
  const {
    description,
    worry_and_effort,
    respect_rules,
    solidarity_and_collaboration,
    group_responsibility,
    student_id,
    subject_id,
    bimonthly_date,
  } = req.body;

  const newObservation = new Observation({
    description,
    worry_and_effort,
    respect_rules,
    solidarity_and_collaboration,
    group_responsibility,
    student_id,
    subject_id,
    bimonthly_date,
  });

  try {
    const savedObservation = await newObservation.save();
    if (savedObservation) {
      res.status(200).json('Observation added!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const getObservations = async (req: Request, res: Response) => {
  try {
    const observations = await Observation.find();
    if (observations) {
      res.status(200).json(observations);
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const getObservationById = async (req: Request, res: Response) => {
  try {
    const observation = await Observation.findById(req.params.id);
    if (observation) {
      res.status(200).json(observation);
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const updateObservation = async (req: Request, res: Response) => {
  try {
    const observation = await Observation.findByIdAndUpdate(req.params.id, req.body);
    if (observation) {
      res.status(200).json('Observation updated!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

const deleteObservation = async (req: Request, res: Response) => {
  try {
    const observation = await Observation.findByIdAndRemove(req.params.id);
    if (observation) {
      res.status(200).json('Observation deleted!');
    }
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
};

export default {
  createObservation,
  getObservations,
  getObservationById,
  updateObservation,
  deleteObservation,
};
