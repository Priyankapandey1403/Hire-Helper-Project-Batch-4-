import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyTask.css";

const MyTasks = ({ tasks }) => {
  const navigate = useNavigate();

  const getStatusText = (status) => {
    switch(status) {
      case 0:
        return "Active";
      case 1:
        return  "In Progress";
      case 2:
        return "Completed";
      default:
        return "Pending";
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 0:
        return "active";
      case 1:
        return  "in progress";
      case 2:
        return "completed";
      default:
        return "pending";
    }
  };
  

  return (
    <div className="mytasks-page">
      <div className="mytasks-header">
        <h2>My Tasks</h2>
        <button className="add-btn" onClick={() => navigate("/dashboard/add-task")}>
          + Add New Task
        </button>
      </div>

      <div className="task-grid">
        {tasks.length === 0 ? (
          <p>No tasks added yet.</p>
        ) : (
          tasks.map((task, index) => (
            <div className="task-card" key={index}>
              {task.image && <img src={task.image} alt="task" />}
<div className="task-content">
              <div className="card-top">
    <span className="category-badge">
      {task.category}
    </span>

    <span className={`status-badge ${getStatusClass(task.status)}`}>
      {getStatusText(task.status)}
    </span>
  </div>
   <h3>{task.title}</h3>
    <p className="desc">{task.description}</p>

    <div className="task-info">
      <div className="info-row">
        <i className="fa-solid fa-location-dot"></i>
        <span>{task.location}</span>
      </div>
      <div className="info-row">
        <i className="fa-regular fa-clock"></i>
        <span>{task.dateTime}</span>
      </div>
    </div></div>
              {/* <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>{task.location}</p>
              <p>{task.budget}</p>
              <p>{task.time}</p> */}
              {/* <span>{task.category}</span>
              <span>{task.status}</span> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyTasks;
