// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import RegisterUser from "./components/RegisterUser";
import UpdateStudents from "./components/UpdateStudents";
import DeleteUser from "./components/deleteUser";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/registeruser" element={<RegisterUser />} />
          <Route path="/updatestudents/:userId" element={<UpdateStudents />} />
          <Route path="/userdelete/:id" element={<DeleteUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
