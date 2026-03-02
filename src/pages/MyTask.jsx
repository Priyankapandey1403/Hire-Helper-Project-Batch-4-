import React from "react";
import { FiBell } from "react-icons/fi";
import "../styles/Feed.css";

const MyTask = ({ tasks }) => {
  return (
    <div className="feed-container">

      <div className="feed-top">
        <div>
          <h2>My Tasks</h2>
          <p className="feed-subtitle">Manage your posted tasks</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div className="search-box">
            <input type="text" placeholder="Search tasks..." />
          </div>

          <div className="notification">
            <FiBell className="bell-icon"/>
          </div>
        </div>
      </div>

      <div className="card-grid">
        {tasks.map((task) => (
          <div className="card" key={task.id}>

            {task.image && (
              <img
                src={URL.createObjectURL(task.image)}
                alt={task.title}
              />
            )}

            <div className="card-body">
              <h3>{task.title}</h3>
              <p>{task.description}</p>

              <div className="info">
                <p><strong>Location:</strong> {task.location}</p>
                <p><strong>Posted by:</strong> {task.user}</p>
              </div>

              <div className="card-footer">
                <button disabled>Your Task</button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default MyTask;