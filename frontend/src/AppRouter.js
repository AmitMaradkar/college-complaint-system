import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";

import StudentRegister from "./pages/StudentRegister";

import ComplaintDetails from "./pages/ComplaintDetails";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/student/register" element={<StudentRegister />} />
        <Route path="/admin/complaint/:id" element={<ComplaintDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
