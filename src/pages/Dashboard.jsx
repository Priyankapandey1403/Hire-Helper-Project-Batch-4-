import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";

function Dashboard() {

  // Get user from localStorage
  const userData = JSON.parse(localStorage.getItem("user"));

  const firstName = userData?.firstName || "User";

  return (
    <div className="dashboard-container">

      <Sidebar />

      <div className="dashboard-content">

        <h1>
          Welcome,
          <span className="username"> {firstName}</span>
        </h1>

        <div className="card">
          <h3>Your Activity</h3>
          <p>Create tasks and help others.</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;
