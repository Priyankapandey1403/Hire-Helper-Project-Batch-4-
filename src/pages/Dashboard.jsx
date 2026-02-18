import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Notifications from "./Notifications";
import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Routes>
          {/* Default Dashboard Page */}
          <Route path="/" element={<Feed />} />

          {/* Notifications Page */}
          <Route path="notifications" element={<Notifications />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;