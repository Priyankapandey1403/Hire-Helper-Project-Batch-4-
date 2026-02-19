import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2>HireHelper</h2>

      <ul>

        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/feed">Feed</Link>
        </li>

        <li>
          <Link to="/my-tasks">My Tasks</Link>
        </li>

        <li>
          <Link to="/add-task">Add Task</Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;
