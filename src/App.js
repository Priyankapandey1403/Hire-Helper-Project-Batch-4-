import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyCode from "./pages/VerifyCode";
import NewPassword from "./pages/NewPassword";
import Dashboard from "./pages/Dashboard";
import Feed from "./pages/Feed";
import AddTask from "./pages/addtask";
import MyTasks from "./pages/mytasks";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/verify-otp" element={<VerifyOTP />} />
         <Route path="/reset-password" element={<ChangePassword/>}/>
          <Route path="/forgot-password" element={<ForgotPassword />} />     
        <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/new-password" element={<NewPassword/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/my-tasks" element={<MyTasks />} />

                
      </Routes>
    </BrowserRouter>
  );
}

export default App;