import React, { useState, useEffect } from "react";

const Students = () => {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    fatherName: "",
    rollNumber: "",
    grade: "",
    formBay: "",
    image: null,
    password: "", 
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:4000/api/get", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch student");
          setLoading(false);
          return;
        }

        const data = await response.json();
        setStudent(data.getUser);
        setFormData({
          name: data.getUser.name,
          email: data.getUser.email,
          fatherName: data.getUser.fatherName,
          rollNumber: data.getUser.rollNumber,
          grade: data.getUser.grade,
          formBay: data.getUser.formBay,
          image: data.getUser.image || null,
          password: "", // Initialize password as an empty string
        });
      } catch (error) {
        console.error("Error fetching student:", error);
        setError("Error fetching student");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No authentication token found. Please log in.");
      return;
    }

    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://localhost:4000/api/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSubmit,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update student");
        return;
      }

      const updatedData = await response.json();
      setStudent(updatedData.user);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating student:", error);
      setError("Error updating student");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-blue-500 mb-4">
        Student Information
      </h2>

      {loading ? (
        <p className="text-blue-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : student ? (
        <div className="bg-blue-100 p-4 rounded-lg shadow-md flex items-center space-x-4">
          <img
            src={student.image || "default-image-url"}
            alt={student.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {editMode ? (
            <div className="flex-1">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="mb-2 p-2 border rounded"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="mb-2 p-2 border rounded"
              />
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
                placeholder="Father's Name"
                className="mb-2 p-2 border rounded"
              />
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleInputChange}
                placeholder="Roll Number"
                className="mb-2 p-2 border rounded"
              />
              <input
                type="text"
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                placeholder="Grade"
                className="mb-2 p-2 border rounded"
              />
              <input
                type="text"
                name="formBay"
                value={formData.formBay}
                onChange={handleInputChange}
                placeholder="Form Bay"
                className="mb-2 p-2 border rounded"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="New Password" // New field for password update
                className="mb-2 p-2 border rounded"
              />
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="mb-2 p-2 border rounded"
              />
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          ) : (
            <div className="flex-1">
              <h3 className="font-medium text-blue-700">{student.name}</h3>
              <h3 className="font-medium text-blue-700">{student.email}</h3>
              <p className="text-sm text-blue-600">
                Father's Name: {student.fatherName}
              </p>
              <p className="text-sm text-blue-600">
                Roll Number: {student.rollNumber}
              </p>
              <p className="text-sm text-blue-600">Grade: {student.grade}</p>
              <p className="text-sm text-blue-600">Form Bay: {student.formBay}</p>
            </div>
          )}
          <button
            onClick={() => setEditMode(!editMode)}
            className="ml-4 bg-yellow-500 text-white px-4 py-2 rounded"
          >
            {editMode ? "Cancel" : "Edit"}
          </button>
        </div>
      ) : (
        <p>No student data found</p>
      )}
    </div>
  );
};

export default Students;
