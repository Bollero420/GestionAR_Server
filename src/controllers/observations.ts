import Observation from '../models/observation';
import { Request, Response } from 'express';

const createObservation = async (req: Request, res: Response) => {
  const { 
    description,
    worry_and_effort,
    respect_rules,
    solidarity_and_collaboration,
    group_responsibility,
    student_id,
    subject_id,
    bimonthly_date
  } = req.body;

  const newObservation = new Observation({
    description,
    worry_and_effort,
    respect_rules,
    solidarity_and_collaboration,
    group_responsibility,
    student_id,
    subject_id,
    bimonthly_date
  });

  try {
    const savedObservation = await newObservation.save();
    if (savedObservation) {
      res.json('Observation added!')
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const getObservations = async (req: Request, res: Response) => {
  try {
    const observations = Observation.find();
    if (observations) {
      res.json(observations)
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const getObservationById = async (req: Request, res: Response) => {
  try {
    const observation = Observation.findById(req.params.id);
    if (observation) {
      res.json(observation)
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const updateObservation = async (req: Request, res: Response) => {
  try {
    const observation = Observation.findByIdAndUpdate(req.params.id, req.body);
    if (observation) {
      res.json('Observation updated!')
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

const deleteObservation = async (req: Request, res: Response) => {
  try {
    const observation = Observation.findByIdAndRemove(req.params.id);
    if (observation) {
      res.json('Observation deleted!')
    }
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
}

export default {
  createObservation,
  getObservations,
  getObservationById,
  updateObservation,
  deleteObservation
};