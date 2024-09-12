import React from 'react';

const Students = () => {
  const students = [
    { id: 1, name: 'John Doe', age: 20 },
    { id: 2, name: 'Jane Smith', age: 21 },
    { id: 3, name: 'Michael Brown', age: 22 },
  ];

  return (
    <div>
      <h1>Students List</h1>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            {student.name}, Age: {student.age}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Students;
