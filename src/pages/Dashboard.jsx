import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Notifications from "./Notifications";
import CreateTask from "./CreateTask";
import MyTask from "./MyTask";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [requests, setRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const currentUser = "Riya";

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleRequest = (task) => {
    const newRequest = {
      id: Date.now(),
      taskId: task.id,
      taskTitle: task.title,
      owner: task.user,
      helper: currentUser,
      status: "Pending",
    };

    setRequests([...requests, newRequest]);

    const newNotification = {
      id: Date.now(),
      message: `${currentUser} sent request for your task "${task.title}"`,
    };

    setNotifications([...notifications, newNotification]);
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="feed" />} />

          <Route
            path="feed"
            element={
              <Feed
                tasks={tasks}
                handleRequest={handleRequest}
              />
            }
          />

          <Route
            path="add-task"
            element={<CreateTask addTask={addTask} />}
          />

          <Route
            path="my-tasks"
            element={<MyTask tasks={tasks} />}
          />

          <Route
            path="notifications"
            element={
              <Notifications notifications={notifications} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;