import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/clerk-react';

const JobCart = ({ job }) => {
    const navigate = useNavigate();
    const { isSignedIn } = useUser();

    const handleNavigation = () => {
        if (isSignedIn) {
            navigate(`/apply-job/${job._id}`);
            window.scrollTo(0, 0);
        } else {
            toast.error('Please register or login to proceed.');
        }
    };

    return (
        <div className="bg-white/70 backdrop-blur-lg border border-gray-200 p-6 shadow-lg rounded-2xl transition-transform duration-200 hover:scale-[1.02] hover:shadow-xl">
            {/* Top Section with Logo */}
            <div className="flex justify-between items-center">
                {job.companyId?.image && (
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full overflow-hidden shadow-sm">
                        <img src={job.companyId.image} alt="Company Logo" className="h-8 w-8 object-contain" />
                    </div>
                )}
            </div>

            {/* Job Title */}
            <h4 className="font-semibold text-lg text-gray-800 mt-4">{job.title}</h4>

            {/* Tags */}
            <div className="flex items-center gap-2 mt-3 text-xs flex-wrap">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{job.location}</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">{job.level}</span>
            </div>

            {/* Job Description */}
            <p className="text-gray-500 text-sm mt-4 leading-relaxed"
               dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150)  }}>
            </p>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3 text-sm">
                <button
                    onClick={handleNavigation}
                    className="cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                >
                    Apply Now
                </button>
                <button
                    onClick={handleNavigation}
                    className="cursor-pointer text-gray-600 border border-gray-300 rounded-full px-5 py-2 hover:bg-gray-100 transition-all duration-200"
                >
                    Learn More
                </button>
            </div>
        </div>
    );
};

export default JobCart;
