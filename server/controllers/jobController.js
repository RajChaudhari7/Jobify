import Job from "../models/Job.js"


// get all jobs
export const getJobs = async (req, res) => {
    try {

        const jobs = await Job.find({
            visible: true
        }).populate({ path: 'companyId', select: '-password' })

        res.json({ success: true, jobs })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// get single job by id
export const getJobById = async (req, res) => {
    try {

        const { id } = req.params

        const job = await Job.findById(id)
            .populate({
                path: 'companyId',
                select: '-password'
            })

        if (!job) {
            return res.json({ success: false, message: 'Job Not Found' })
        }

        res.json({ success: true, job })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Get job meta-data (categories, locations, levels)
export const getJobMetaData = async (req, res) => {
    try {
        const jobs = await Job.find({ visible: true });
        const categories = [...new Set(jobs.map(job => job.category))];
        const locations = [...new Set(jobs.map(job => job.location))];
        const levels = [...new Set(jobs.map(job => job.level))];
        res.json({ success: true, categories, locations, levels });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};