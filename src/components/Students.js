import React, { useState, useEffect } from "react";

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/get");

        const data = await response.json();
        console.log("Fetched data:", data);

        if (Array.isArray(data.getUser)) {
          setStudents(data.getUser);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-blue-500 mb-4">
        Students List
      </h2>
      <ul className="space-y-4">
        {students.map((student) => (
          <li
            key={student.id}
            className="bg-blue-100 p-4 rounded-lg shadow-md flex items-center space-x-4"
          >
            <img
              src={student.image || "default-image-url"}
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
    </div>
  );
};

export default Students;
