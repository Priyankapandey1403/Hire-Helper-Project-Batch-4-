import React from "react";
import "../styles/Feed.css";

function TaskCard({ task }) {

  const handleRequest = () => {
    alert("Request Sent for: " + task.title);
  };

  return (
    <div className="task-card">

      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <p>Location: {task.location}</p>

      <p>Start: {task.startTime}</p>

      <p>End: {task.endTime}</p>

      <button onClick={handleRequest}>
        Request
      </button>

    </div>
  );
}

export default TaskCard;
