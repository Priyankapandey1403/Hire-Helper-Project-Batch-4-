import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyRegistration from "./pages/VerifyRegistration";
import VerifyOTP from "./pages/VerifyOTP";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import Dashboard from "./pages/Dashboard";
import Feed from "./pages/Feed";
import AddTask from "./pages/AddTask";
import MyTasks from "./pages/MyTasks";


function App() { 
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
  <Route path="/verify-otp" element={<VerifyRegistration />} />
  <Route path="/verify-code" element={<VerifyOTP />} />
  <Route path="/reset-password" element={<ChangePassword />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/new-password" element={<NewPassword />} />

  {/* Dashboard */}
  <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;