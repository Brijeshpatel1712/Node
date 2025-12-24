import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import JobModule from "./pages/JobModule";
import JobList from "./pages/JobList";
import UserModule from "./pages/UserModule";

import "./style.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-panel" element={<AdminPanel />} />

        <Route path="/jobs" element={<JobModule />} />
        <Route path="/jobs/:role" element={<JobList />} />
        <Route path="/user" element={<UserModule />} />
      </Routes>
    </BrowserRouter>
  );
}
