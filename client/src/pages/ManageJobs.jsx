import React, { useState } from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import Loading from '../components/Loading'

const ManageJobs = () => {

  const navigate = useNavigate()

  const [jobs, setJobs] = useState(false)

  const { backendUrl, companyToken } = useContext(AppContext)

  // function to fetch company job applications data
  const fetchCompanyJobs = async () => {

    try {

      const { data } = await axios.get(backendUrl + '/api/company/list-jobs',
        { headers: { token: companyToken } })

      if (data.success) {
        setJobs(data.jobsData.reverse())
        console.log(data.jobsData);

      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  // function to change job visibility
  const changeJobVisibility = async (id, visible) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/company/change-visibility',
        { id, visible }, // Send the new visibility state
        { headers: { token: companyToken } }
      );
      if (data.success) {
        toast.success('Visibility Changed');
        fetchCompanyJobs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to delete a job
  const deleteJob = async (id) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/company/delete-job/${id}`,
        { headers: { token: companyToken } }
      );
      if (data.success) {
        toast.success('Job deleted successfully');
        fetchCompanyJobs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs()
    }
  }, [companyToken])

  return jobs ? jobs.length === 0 ? (
    <div className='flex items-center justify-center h-[70vh]'>
      <p className='text-xl sm:text-2xl'>No Jobs Available or Posted!</p>
    </div>
  ) : (
    <div className='container p-4 max-w-5xl'>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 max-sm:text-sm'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b border-gray-300 text-left max-sm:hidden'>#</th>
              <th className='py-2 px-4 border-b border-gray-300 text-left'>Job Title</th>
              <th className='py-2 px-4 border-b border-gray-300 text-left max-sm:hidden'>Date</th>
              <th className='py-2 px-4 border-b border-gray-300 text-left max-sm:hidden'>Location</th>
              <th className='py-2 px-4 border-b border-gray-300 text-center'>Applicants</th>
              <th className='py-2 px-4 border-b border-gray-300 text-left'>Visible</th>
              <th className='py-2 px-4 border-b border-gray-300 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr className='text-gray-700' key={index}>
                <td className='py-2 px-4 border-b border-gray-300 max-sm:hidden'>{index + 1}</td>
                <td className='py-2 px-4 border-b border-gray-300'>{job.title}</td>
                <td className='py-2 px-4 border-b border-gray-300 max-sm:hidden'>{moment(job.date).format('ll')}</td>
                <td className='py-2 px-4 border-b border-gray-300 max-sm:hidden'>{job.location}</td>
                <td className='py-2 px-4 border-b border-gray-300 text-center'>{job.applicants}</td>
                <td className='py-2 px-4 border-b border-gray-300'>
                  <input
                    className="scale-125 ml-4"
                    onChange={(e) => changeJobVisibility(job._id, e.target.checked)}
                    type="checkbox"
                    checked={job.visible}
                  />
                </td>
                <td className='py-2 px-4 border-b border-gray-300'>
                  <button
                    onClick={() => deleteJob(job._id)}
                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm cursor-pointer'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4 flex justify-end'>
        <button
          onClick={() => navigate('/dashboard/add-job')}
          className='uppercase bg-black text-white py-2 px-4 rounded cursor-pointer'
        >
          Add New Job
        </button>
      </div>
    </div>
  ) : <Loading />;
};

export default ManageJobs