import express from 'express'
import { changeJobApplicationsStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'
import { protectCompany } from '../middleware/authMiddleware.js'

const companyRouter = express.Router()

// Register a Company
companyRouter.post('/register', upload.single('image'), registerCompany)

// company login
companyRouter.post('/login', loginCompany)

// get company data
companyRouter.get('/company', protectCompany, getCompanyData)

// post a job
companyRouter.post('/post-job', protectCompany, postJob)

// get applicants data of company
companyRouter.get('/applicants', protectCompany, getCompanyJobApplicants)

// get company job list 
companyRouter.get('/list-jobs', protectCompany, getCompanyPostedJobs)

// change application status
companyRouter.post('/change-status', protectCompany, changeJobApplicationsStatus)

// change applications visibility
companyRouter.post('/change-visibility', protectCompany, changeVisibility)

export default companyRouter;