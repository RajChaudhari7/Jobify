import Quill from 'quill';
import React, { useEffect, useRef, useState } from 'react';
import { JobCategories, JobLocations } from '../assets/assets';
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const AddJob = () => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('Vadodara');
    const [category, setCategory] = useState('Programming');
    const [level, setLevel] = useState('Beginner level');
    const [salary, setSalary] = useState(0);
    const [newCategory, setNewCategory] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [newLevel, setNewLevel] = useState('');
    const [showNewCategory, setShowNewCategory] = useState(false);
    const [showNewLocation, setShowNewLocation] = useState(false);
    const [showNewLevel, setShowNewLevel] = useState(false);
    const { backendUrl, companyToken } = useContext(AppContext);
    const editorRef = useRef(null);
    const quillRef = useRef(null);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const description = quillRef.current.root.innerHTML;
            const { data } = await axios.post(
                backendUrl + '/api/company/post-job',
                { title, description, location, salary, category, level },
                { headers: { token: companyToken } }
            );
            if (data.success) {
                toast.success(data.message);
                setTitle('');
                setSalary(0);
                quillRef.current.root.innerHTML = '';
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleAddCategory = () => {
        if (newCategory.trim() !== '') {
            JobCategories.push(newCategory);
            setCategory(newCategory);
            setNewCategory('');
            setShowNewCategory(false);
        }
    };

    const handleAddLocation = () => {
        if (newLocation.trim() !== '') {
            JobLocations.push(newLocation);
            setLocation(newLocation);
            setNewLocation('');
            setShowNewLocation(false);
        }
    };

    const handleAddLevel = () => {
        if (newLevel.trim() !== '') {
            setLevel(newLevel);
            setNewLevel('');
            setShowNewLevel(false);
        }
    };

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
            });
        }
    }, []);

    return (
        <form onSubmit={onSubmitHandler} className="container p-4 flex flex-col w-full items-start gap-3">
            <div className="w-full">
                <p className="mb-2">Job Title</p>
                <input
                    className="w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded outline-none"
                    type="text"
                    placeholder="Type Here.."
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    required
                />
            </div>
            <div className="w-full max-w-lg">
                <p className="my-2">Job Description</p>
                <div ref={editorRef}></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
                <div>
                    <p className="mb-2">Job Category</p>
                    {showNewCategory ? (
                        <div className="flex gap-1">
                            <input
                                type="text"
                                className="w-full px-3 py-2 border-2 border-gray-300 rounded outline-none"
                                placeholder="Enter new category"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                            />
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-3 py-2 rounded"
                                onClick={handleAddCategory}
                            >
                                Add
                            </button>
                        </div>
                    ) : (
                        <select
                            className="w-full px-3 py-2 border-2 border-gray-300 rounded outline-none"
                            onChange={(e) => {
                                if (e.target.value === 'add_new') {
                                    setShowNewCategory(true);
                                } else {
                                    setCategory(e.target.value);
                                }
                            }}
                            value={category}
                        >
                            {JobCategories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                            <option value="add_new">+ Add New</option>
                        </select>
                    )}
                </div>
                <div>
                    <p className="mb-2">Job Location</p>
                    {showNewLocation ? (
                        <div className="flex gap-1">
                            <input
                                type="text"
                                className="w-full px-3 py-2 border-2 border-gray-300 rounded outline-none"
                                placeholder="Enter new location"
                                value={newLocation}
                                onChange={(e) => setNewLocation(e.target.value)}
                            />
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-3 py-2 rounded"
                                onClick={handleAddLocation}
                            >
                                Add
                            </button>
                        </div>
                    ) : (
                        <select
                            className="w-full px-3 py-2 border-2 border-gray-300 rounded outline-none"
                            onChange={(e) => {
                                if (e.target.value === 'add_new') {
                                    setShowNewLocation(true);
                                } else {
                                    setLocation(e.target.value);
                                }
                            }}
                            value={location}
                        >
                            {JobLocations.map((location, index) => (
                                <option key={index} value={location}>
                                    {location}
                                </option>
                            ))}
                            <option value="add_new">+ Add New</option>
                        </select>
                    )}
                </div>
                <div>
                    <p className="mb-2">Job Level</p>
                    {showNewLevel ? (
                        <div className="flex gap-1">
                            <input
                                type="text"
                                className="w-full px-3 py-2 border-2 border-gray-300 rounded outline-none"
                                placeholder="Enter new level"
                                value={newLevel}
                                onChange={(e) => setNewLevel(e.target.value)}
                            />
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-3 py-2 rounded"
                                onClick={handleAddLevel}
                            >
                                Add
                            </button>
                        </div>
                    ) : (
                        <select
                            className="w-full px-3 py-2 border-2 border-gray-300 rounded outline-none"
                            onChange={(e) => {
                                if (e.target.value === 'add_new') {
                                    setShowNewLevel(true);
                                } else {
                                    setLevel(e.target.value);
                                }
                            }}
                            value={level}
                        >
                            <option value="Beginner Level">Beginner Level</option>
                            <option value="Intermediate Level">Intermediate Level</option>
                            <option value="Senior Level">Senior Level</option>
                            <option value="add_new">+ Add New</option>
                        </select>
                    )}
                </div>
            </div>
            <div>
                <p className="mb-2">Job Salary</p>
                <input
                    min={0}
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]"
                    type="number"
                    placeholder="20000"
                    onChange={(e) => setSalary(e.target.value)}
                    value={salary}
                />
            </div>
            <button className="w-28 py-3 mt-4 bg-black text-white rounded cursor-pointer uppercase">
                Add
            </button>
        </form>
    );
};

export default AddJob;
