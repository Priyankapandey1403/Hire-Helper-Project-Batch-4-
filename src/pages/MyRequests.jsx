import React from "react";
import "./MyRequests.css";

const MyRequests = ({ requests }) => {
  return (
    <div className="requests-container">

      <div className="requests-header">
        <h2>My Requests</h2>
        <p className="subtitle">Tasks you have requested</p>
      </div>

      <div className="task-grid">
        {requests.length === 0 ? (
          <p>No requests yet.</p>
        ) : (
          requests.map((task, index) => (
            <div className="task-card" key={index}>

              {task.image && (
                <img
                  src={task.image}
                  alt="task"
                  className="task-image"
                />
              )}

              <div className="task-content">

                <div className="task-top">
                  <span className="category">
                    {task.category}
                  </span>

                  <span className={`status ${task.status}`}>
                    {task.status}
                  </span>
                </div>

                <h3>{task.title}</h3>
                <p className="desc">{task.description}</p>

                <div className="task-info">
                  <div className="info-row">
                    📍 {task.location}
                  </div>
                  <div className="info-row">
                    🕒 {task.startTime} - {task.endTime}
                  </div>
                </div>

                <div className="card-footer">
                  <button className="cancel-btn">
                    Cancel Request
                  </button>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default MyRequests;