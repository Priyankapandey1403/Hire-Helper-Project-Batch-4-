import React from "react";
import { useNavigate , useLocation} from "react-router-dom";
import {
  Home,
  ClipboardList,
  Inbox,
  Plus,
  Settings,
  LogOut
} from "lucide-react";
import "../styles/Sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

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

  <li
    className={`menu-item ${
      location.pathname === "/dashboard" ? "active" : ""
    }`}
    onClick={() => navigate("/dashboard")}
  >
    <Home size={18} />
    <span>Feed</span>
  </li>

  <li
    className={`menu-item ${
      location.pathname === "/dashboard/my-tasks" ? "active" : ""
    }`}
    onClick={() => navigate("/dashboard/my-tasks")}
  >
    <ClipboardList size={18} />
    <span>My Tasks</span>
  </li>

  <li
    className={`menu-item ${
      location.pathname === "/dashboard/requests" ? "active" : ""
    }`}
    onClick={() => navigate("/dashboard/requests")}
  >
    <Inbox size={18} />
    <span>Requests</span>
  </li>

 <li
    className={`menu-item ${
      location.pathname === "/dashboard/my-requests" ? "active" : ""
    }`}
    onClick={() => navigate("/dashboard/my-requests")}
  >
    <Inbox size={18} />
    <span>My Requests</span>
  </li>



  <li
    className={`menu-item ${
      location.pathname === "/dashboard/add-task" ? "active" : ""
    }`}
    onClick={() => navigate("/dashboard/add-task")}
  >
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