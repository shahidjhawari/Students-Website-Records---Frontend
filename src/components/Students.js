import React, { useState, useEffect } from "react";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null); // To handle any errors
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage

      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:4000/api/get", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Add the token in the Authorization header
            "Content-Type": "application/json",
          },
        });

        // Check for response status
        if (!response.ok) {
          if (response.status === 401) {
            setError("Unauthorized access. Please log in again.");
          } else {
            const errorData = await response.json();
            setError(errorData.message || "Failed to fetch students");
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        // Ensure that data is in the expected format
        if (Array.isArray(data.getUser)) {
          setStudents(data.getUser);
        } else {
          console.error("Unexpected data format:", data);
          setError("Unexpected data format received.");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Error fetching students");
      } finally {
        setLoading(false); // Always stop loading at the end
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-blue-500 mb-4">
        Students List
      </h2>

      {loading ? ( // Show loading indicator
        <p className="text-blue-500">Loading...</p>
      ) : error ? ( // Show error if there's an error
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="space-y-4">
          {students.map((student) => (
            <li
              key={student._id} // Use _id as the unique key for MongoDB
              className="bg-blue-100 p-4 rounded-lg shadow-md flex items-center space-x-4"
            >
              <img
                src={student.image || "default-image-url"} // Use default image if none provided
                alt={student.name}
                className="w-16 h-16 rounded-full object-cover"
              />
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
                <p className="text-sm text-blue-600">
                  Form Bay: {student.formBay}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Students;
