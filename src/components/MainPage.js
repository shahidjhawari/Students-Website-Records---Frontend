import React from 'react';
import Students from './Students';

const MainPage = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">Welcome to the Student Records Page</h1>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <Students />
      </div>
    </div>
  );
};

export default MainPage;
