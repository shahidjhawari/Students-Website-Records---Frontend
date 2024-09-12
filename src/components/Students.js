import React from 'react';

const Students = () => {
  const students = [
    {
      id: 1,
      name: 'John Doe',
      fatherName: 'Richard Doe',
      rollNumber: 101,
      grade: 'A',
      formBay: 23,
      image: 'https://via.placeholder.com/100', 
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-blue-500 mb-4">Students List</h2>
      <ul className="space-y-4">
        {students.map((student) => (
          <li key={student.id} className="bg-blue-100 p-4 rounded-lg shadow-md flex items-center space-x-4">
            <img
              src={student.image}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-medium text-blue-700">{student.name}</h3>
              <p className="text-sm text-blue-600">Father's Name: {student.fatherName}</p>
              <p className="text-sm text-blue-600">Roll Number: {student.rollNumber}</p>
              <p className="text-sm text-blue-600">Grade: {student.grade}</p>
              <p className="text-sm text-blue-600">Form Bay: {student.formBay}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Students;
