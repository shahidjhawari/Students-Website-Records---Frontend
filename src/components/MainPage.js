import React from "react";
import Students from "./Students";
import { Link } from "react-router-dom";
import RegisterUser from "./RegisterUser";

const MainPage = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
        Welcome to the Student Records Page
      </h1>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <Link
          className="w-full bg-blue-700 text-white py-1 px-5 rounded-lg hover:bg-blue-900 transition duration-2000"
          to={"/registeruser"}
        >
          Register User
        </Link>
        <Link
          className="w-full bg-blue-700 text-white py-1 mx-2 px-5 rounded-lg hover:bg-blue-900 transition duration-2000"
          to={"/updatestudents/66ed6e8ac6192c72d79f15ca"}
        >
          Update User
        </Link>
        <Students />
      </div>
    </div>
  );
};

export default MainPage;
