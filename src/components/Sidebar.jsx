import React from "react";
import { useNavigate } from "react-router-dom";
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

  // ✅ Get logged-in user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      {/* Top Section */}
      <div className="sidebar-top">
        <div className="logo-section">
          <div className="logo-icon">🔧</div>
          <h2 className="logo-text">Hire-a-Helper</h2>
        </div>

        <ul className="menu">
          <li className="menu-item active">
            <Home size={18} />
            <span>Feed</span>
          </li>

          <li className="menu-item">
            <ClipboardList size={18} />
            <span>My Tasks</span>
          </li>

          <li className="menu-item">
            <Inbox size={18} />
            <span>Requests</span>
          </li>

          <li className="menu-item">
            <Inbox size={18} />
            <span>My Requests</span>
          </li>

          <li className="menu-item">
            <Plus size={18} />
            <span>Add Task</span>
          </li>

          <li className="menu-item">
            <Settings size={18} />
            <span>Settings</span>
          </li>
        </ul>
      </div>

      {/* Bottom Section */}
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