import React, { use } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyRegistration from "./pages/VerifyRegistration";
import VerifyOTP from "./pages/VerifyOTP";
import ChangePassword from "./pages/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import Dashboard from "./pages/Dashboard";
import MyTasks from "./pages/MyTask";
import AddTask from "./pages/AddTask";
import Feed from "./components/Feed";
import Notification from "./pages/Notifications";
import Notifications from "./pages/Notifications";
import MyRequests from "./pages/MyRequests";
import Requests from "./pages/Requests";

function App() { 
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) :[];
  });


  const[incomingRequests, setIncomingRequests] = useState([]);
  const [requests, setRequests] = useState([]);
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
        {/* <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/my-tasks" element={<MyTasks tasks = {tasks} />} />
        <Route path="/add-task" element={<AddTask setTasks = {setTasks} />} /> */}
        <Route path="/dashboard" element={<Dashboard />}>
    <Route index  element={<Feed tasks={ tasks} />} />
    <Route path = "/dashboard/notifications" element = {<Notifications/>}/>
    
    <Route path="/dashboard/my-tasks" element={<MyTasks tasks = {tasks} />} />
    <Route path="/dashboard/add-task" element={<AddTask setTasks={setTasks} />} />
     <Route
  path="/dashboard/my-requests"
  element={<MyRequests requests={requests} />}
/>
    <Route
  path="/dashboard/requests"
  element={<Requests incomingRequests={incomingRequests} />}
/>


</Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;