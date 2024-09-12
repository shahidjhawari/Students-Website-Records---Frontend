import React from 'react';

const Students = () => {
  const students = [
    { id: 1, name: 'John Doe', age: 20 },
    { id: 2, name: 'Jane Smith', age: 21 },
    { id: 3, name: 'Michael Brown', age: 22 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-blue-500 mb-4">Students List</h2>
      <ul className="space-y-4">
        {students.map((student) => (
          <li key={student.id} className="bg-blue-100 p-4 rounded-lg shadow-md flex justify-between items-center">
            <span className="font-medium text-blue-700">{student.name}</span>
            <span className="text-blue-600">Age: {student.age}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Students;
