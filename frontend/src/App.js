import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Students from "./pages/admin/Students";
import AdminCourses from "./pages/admin/Courses";
import AdminGrades from "./pages/admin/Grades";

import StudentDashboard from "./pages/student/StudentDashboard";
import Courses from "./pages/student/Courses";
import MyCourses from "./pages/student/MyCourses";
import Grades from "./pages/student/Grades";

function App() {

 return (

  <BrowserRouter>

   <Routes>

    {/* redirect root */}
    <Route path="/" element={<Navigate to="/login" />} />

    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />

    {/* admin */}
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/admin/students" element={<Students />} />
    <Route path="/admin/courses" element={<AdminCourses />} />
    <Route path="/admin/grades" element={<AdminGrades />} />

    {/* student */}
    <Route path="/student" element={<StudentDashboard />} />
    <Route path="/student/courses" element={<Courses />} />
    <Route path="/student/mycourses" element={<MyCourses />} />
    <Route path="/student/grades" element={<Grades />} />

   </Routes>

  </BrowserRouter>

 );
}

export default App;