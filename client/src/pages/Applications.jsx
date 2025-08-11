import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { assets, jobsApplied } from '../assets/assets';
import moment from 'moment';
import Footer from '../components/Footer';

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  return (
    <>
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold'>Your Resume</h2>
        <div className='flex flex-col md:flex-row gap-2 mb-6 mt-3'>
          {isEdit ? (
            <>
              <label className='flex items-center' htmlFor="resumeUpload">
                <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2 cursor-pointer'>Select Resume</p>
                <input accept='application/pdf' type="file" hidden onChange={e => setResume(e.target.files[0])} id='resumeUpload' />
                <img src={assets.profile_upload_icon} alt="" className='w-6 h-6'/>
              </label>
              <button className='bg-green-100 border border-green-400 rounded-lg px-4 py-2 cursor-pointer'
                onClick={() => setIsEdit(false)}>Save</button>
            </>
          ) : (
            <div className='flex flex-col md:flex-row gap-2'>
              <a className='bg-blue-100 text-blue-600 px-4 py-2 rounded text-center' href="">
                Resume
              </a>
              <button onClick={() => setIsEdit(true)}
                className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer'>
                Edit
              </button>
            </div>
          )}
        </div>
        <h2 className='text-xl font-semibold mb-4'>Jobs Applied</h2>
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white border border-gray-400 rounded-lg'>
            <thead>
              <tr>
                <th className='py-3 px-4 border-b border-gray-400 text-left'>Company</th>
                <th className='py-3 px-4 border-b border-gray-400 text-left'>Job Title</th>
                <th className='py-3 px-4 border-b border-gray-400 text-left'>Location</th>
                <th className='py-3 px-4 border-b border-gray-400 text-left'>Date</th>
                <th className='py-3 px-4 border-b border-gray-400 text-left'>Status</th>
              </tr>
            </thead>
            <tbody>
              {jobsApplied.map((job, index) => true? (
                <tr key={index}>
                  <td className='py-3 px-4 flex items-center gap-2 border-b border-gray-400'>
                    <img src={job.logo} alt={job.company} className='w-8 h-8'/>
                    <span className='whitespace-nowrap'>{job.company}</span>
                  </td>
                  <td className='py-2 px-4 border-b border-gray-400 whitespace-nowrap'>{job.title}</td>
                  <td className='py-2 px-4 border-b border-gray-400 whitespace-nowrap'>{job.location}</td>
                  <td className='py-2 px-4 border-b border-gray-400 whitespace-nowrap'>{moment(job.date).format('ll')}</td>
                  <td className='py-2 px-4 border-b border-gray-400 whitespace-nowrap'>
                    <span className={`${job.status === 'Accepted' ? 'bg-green-200' : job.status === 'Rejected' ? 'bg-red-200' : 'bg-blue-200'}
                    px-4 py-1.5 rounded`}>{job.status}</span>
                    </td>
                </tr>
              ): (null))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Applications;
