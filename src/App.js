import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import RegisterUser from "./components/RegisterUser";
import UpdateStudents from "./components/UpdateStudents";
import DeleteUser from "./components/deleteUser";
import Login from "./components/LoginUser";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/registeruser" element={<RegisterUser />} />
          <Route path="/updatestudents" element={<UpdateStudents />} />
          <Route path="/userdelete" element={<DeleteUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
