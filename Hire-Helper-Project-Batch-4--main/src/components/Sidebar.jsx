import React from "react";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">Hire-a-Helper</h2>

      <ul>
        <li className="active">Feed</li>
        <li>My Tasks</li>
        <li>Requests</li>
        <li>My Requests</li>
        <li>Add Task</li>
        <li>Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;