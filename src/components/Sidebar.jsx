import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  ClipboardList,
  Inbox,
  Plus,
  Settings,
  LogOut
} from "lucide-react";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path ? "menu-item active" : "menu-item";
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="logo-section">
          <div className="logo-icon">🔧</div>
          <h2 className="logo-text">Hire-a-Helper</h2>
        </div>

        <ul className="menu">
          <li
            className={isActive("/dashboard/feed")}
            onClick={() => navigate("/dashboard/feed")}
          >
            <Home size={18} />
            <span>Feed</span>
          </li>

          <li
            className={isActive("/dashboard/my-tasks")}
            onClick={() => navigate("/dashboard/my-tasks")}
          >
            <ClipboardList size={18} />
            <span>My Tasks</span>
          </li>

          <li
            className={isActive("/dashboard/requests")}
            onClick={() => navigate("/dashboard/requests")}
          >
            <Inbox size={18} />
            <span>Requests</span>
          </li>

          <li
            className={isActive("/dashboard/my-requests")}
            onClick={() => navigate("/dashboard/my-requests")}
          >
            <Inbox size={18} />
            <span>My Requests</span>
          </li>

          <li
            className={isActive("/dashboard/add-task")}
            onClick={() => navigate("/dashboard/add-task")}
          >
            <Plus size={18} />
            <span>Add Task</span>
          </li>

          <li
            className={isActive("/dashboard/settings")}
            onClick={() => navigate("/dashboard/settings")}
          >
            <Settings size={18} />
            <span>Settings</span>
          </li>
        </ul>
      </div>

      <div className="bottom-profile">
        <div className="profile-info">
          <div>
            <p className="name">{currentUser?.name}</p>
            <p className="email">{currentUser?.email}</p>
          </div>
        </div>

        <div className="menu-item logout-item" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;