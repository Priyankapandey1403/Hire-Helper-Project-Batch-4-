import React from "react";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Feed />
      </div>
    </div>
  );
};

export default Dashboard;