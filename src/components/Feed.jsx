import React from "react";
import { FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "../styles/Feed.css";

const Feed = ({ tasks, handleRequest }) => {
  const navigate = useNavigate();
  const currentUser = "Riya";

  return (
    <div className="feed-container">
      <div className="feed-top">
        <div>
          <h2>Feed</h2>
          <p className="feed-subtitle">Find tasks that need help</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div className="search-box">
            <input type="text" placeholder="Search tasks..." />
          </div>

          <div
            className="notification"
            onClick={() => navigate("/dashboard/notifications")}
          >
            <FiBell className="bell-icon" />
          </div>
        </div>
      </div>

      <div className="card-grid">
        {tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          tasks.map((task) => (
            <div className="card" key={task.id}>
              {task.image && <img src={URL.createObjectURL(task.image)} alt={task.title} />}

              <div className="card-body">
                <h3>{task.title}</h3>
                <p>{task.description}</p>

                <div className="info">
                  <p><strong>Location:</strong> {task.location}</p>
                  <p><strong>Posted by:</strong> {task.user}</p>
                </div>

                <div className="card-footer">
                  {task.user !== currentUser ? (
                    <button onClick={() => handleRequest(task)}>
                      Request to Help
                    </button>
                  ) : (
                    <button disabled style={{ backgroundColor: "#ccc" }}>
                      Your Task
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;