import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateStudents = () => {
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    rollNumber: '',
    grade: '',
    formBay: '',
    image: null,
  });

  const [status, setStatus] = useState('');
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/get/${userId}`);
        const user = await response.json();

        console.log('Fetched user data:', user); // Log the user data

        if (response.ok) {
          setFormData({
            name: user.getUser.name || '',   // Ensure correct path based on your response structure
            fatherName: user.getUser.fatherName || '',
            rollNumber: user.getUser.rollNumber || '',
            grade: user.getUser.grade || '',
            formBay: user.getUser.formBay || '',
            image: null,
          });
        } else {
          setStatus('Failed to load user data.');
        }
      } catch (error) {
        setStatus('An error occurred while fetching user data.');
        console.error('Fetch error:', error); // Log the error
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('fatherName', formData.fatherName);
    data.append('rollNumber', formData.rollNumber);
    data.append('grade', formData.grade);
    data.append('formBay', formData.formBay);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const response = await fetch(`http://localhost:4000/api/update/${userId}`, {
        method: 'PUT',
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        setStatus('Success! Student information updated.');
        console.log('Response from API:', result);
      } else {
        setStatus('Failed to update student information.');
        console.error('Error in API response:', response.statusText);
      }
    } catch (error) {
      setStatus('An error occurred. Please try again later.');
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Student Information</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">Father Name</label>
          <input
            type="text"
            id="fatherName"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">Roll Number</label>
          <input
            type="text"
            id="rollNumber"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700">Grade</label>
          <input
            type="text"
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="formBay" className="block text-sm font-medium text-gray-700">Form Bay</label>
          <input
            type="text"
            id="formBay"
            name="formBay"
            value={formData.formBay}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload New Image (Optional)</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update
        </button>

        {status && <p className="mt-4 text-center text-red-500">{status}</p>}
      </form>
    </div>
  );
};

export default UpdateStudents;
