import React, { useState } from "react";
import TaskCard from "../components/TaskCard";

function MyTasks() {

  const [myTasks] = useState([
    {
      id: 1,
      title: "My Cleaning Task",
      description: "Clean my room",
      location: "Hyderabad",
      startTime: "2026-02-22",
      endTime: "2026-02-22"
    }
  ]);

  return (
    <div>

      <h2>My Tasks</h2>

      {myTasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}

    </div>
  );
}

export default MyTasks;
