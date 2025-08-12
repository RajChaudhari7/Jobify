import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import { assets } from '../assets/assets';
import moment from 'moment';
import Footer from '../components/Footer';
import { AppContext } from '../context/AppContext';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();
  const { user } = useUser();
  const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications } = useContext(AppContext);

  const updateResume = async () => {
    try {
      const formData = new FormData();
      formData.append('resume', resume);
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + '/api/users/update-resume',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        await fetchUserData();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setIsEdit(false);
    setResume(null);
  };

  useEffect(() => {
    if (user) {
      fetchUserData().then(() => setLoading(false));
      fetchUserApplications();
    }
  }, [user]);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        {userData && (
          <>
            <h2 className='text-xl font-semibold'>Your Resume</h2>
            <div className='flex flex-col md:flex-row gap-2 mb-6 mt-3'>
              {isEdit || !userData.resume ? (
                <>
                  <label className='flex items-center' htmlFor="resumeUpload">
                    <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2 cursor-pointer'>
                      {resume ? resume.name : "Select Resume"}
                    </p>
                    <input
                      accept='application/pdf'
                      type="file"
                      hidden
                      onChange={(e) => setResume(e.target.files[0])}
                      id='resumeUpload'
                    />
                    <img src={assets.profile_upload_icon} alt="" className='w-6 h-6' />
                  </label>
                  <button
                    onClick={updateResume}
                    className='bg-green-100 border border-green-400 rounded-lg px-4 py-2 cursor-pointer'
                  >
                    Save
                  </button>
                </>
              ) : (
                <div className='flex flex-col md:flex-row gap-2'>
                  <a
                    target='_blank'
                    href={userData.resume}
                    className='bg-blue-100 text-blue-600 px-4 py-2 rounded text-center'
                    rel="noopener noreferrer"
                  >
                    Resume
                  </a>
                  <button
                    onClick={() => setIsEdit(true)}
                    className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer'
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </>
        )}
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
              {userApplications?.length > 0 ? (
                userApplications.map((job, index) => (
                  <tr key={index}>
                    <td className='py-3 px-4 flex items-center gap-2 border-b border-gray-400'>
                      {job?.companyId?.image ? (
                        <img src={job.companyId.image} alt={job.companyId.name || "Company"} className='w-8 h-8' />
                      ) : (
                        <div className='w-8 h-8 bg-gray-200 rounded'></div>
                      )}
                    </td>
                    <td className='py-2 px-4 border-b border-gray-400 whitespace-nowrap'>
                      {job?.jobId?.title || "N/A"}
                    </td>
                    <td className='py-2 px-4 border-b border-gray-400 whitespace-nowrap'>
                      {job?.jobId?.location || "N/A"}
                    </td>
                    <td className='py-2 px-4 border-b border-gray-400 whitespace-nowrap'>
                      {job?.date ? moment(job.date).format('ll') : "N/A"}
                    </td>
                    <td className='py-2 px-4 border-b border-gray-400 whitespace-nowrap'>
                      <span
                        className={`${
                          job?.status === 'Accepted'
                            ? 'bg-green-200'
                            : job?.status === 'Rejected'
                            ? 'bg-red-200'
                            : 'bg-blue-200'
                        } px-4 py-1.5 rounded`}
                      >
                        {job?.status || "N/A"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 px-4 text-center border-b border-gray-400">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Applications;
