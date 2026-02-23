 import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Notifications from "./Notifications";
import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
