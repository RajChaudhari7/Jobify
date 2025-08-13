import express from 'express'
import { getJobById, getJobMetaData, getJobs } from '../controllers/jobController.js';

const jobRouter = express.Router();

// Route to get all jobs data
jobRouter.get('/', getJobs)

// Route to get sing job by id
jobRouter.get('/:id', getJobById)

// Route to get job meta-data (categories, locations, levels)
jobRouter.get('/meta/data', getJobMetaData);
export default jobRouter;