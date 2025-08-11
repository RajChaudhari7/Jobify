import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/clerk-react';

const JobCart = ({ job }) => {
    const navigate = useNavigate();
    const { isSignedIn } = useUser(); // Use the useUser hook to check if the user is signed in

    const handleNavigation = () => {
        if (isSignedIn) {
            navigate(`/apply-job/${job._id}`);
            window.scrollTo(0, 0);
        } else {
            toast.error('Please register or login to proceed.');
        }
    };

    return (
        <div className='border border-gray-400 p-6 shadow rounded'>
            <div className='flex justify-between items-center'>
                <img src={assets.company_icon} alt="" className='h-8' />
            </div>
            <h4 className='font-medium text-xl mt-2'>{job.title}</h4>
            <div className='flex items-center gap-3 mt-2 text-xs'>
                <span className='bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>{job.location}</span>
                <span className='bg-red-50 border border-red-200 px-4 py-1.5 rounded'>{job.level}</span>
            </div>
            <p className='text-gray-500 text-sm mt-4' dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150) }}></p>
            <div className='mt-4 flex gap-4 text-sm'>
                <button
                    onClick={handleNavigation}
                    className='bg-blue-600 text-white px-4 py-2 rounded cursor-pointer'
                >
                    Apply Now
                </button>
                <button
                    onClick={handleNavigation}
                    className='text-gray-500 border border-gray-500 rounded px-4 py-2 cursor-pointer'
                >
                    Learn More
                </button>
            </div>
        </div>
    );
};

export default JobCart;
