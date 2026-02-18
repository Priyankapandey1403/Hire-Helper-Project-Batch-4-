import React, { useState } from "react";
import "../styles/Dashboard.css";

function AddTask() {

  const [task, setTask] = useState({
    title: "",
    description: "",
    location: "",
    startTime: "",
    endTime: "",
    picture: null
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    });
  };

  const handleImage = (e) => {
    setTask({
      ...task,
      picture: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Task Data:", task);

    alert("Task Created Successfully");

    // later connect backend API here
  };

  return (
    <div className="dashboard-container">

      <h2>Add New Task</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="title"
          placeholder="Task Title"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="startTime"
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="endTime"
          onChange={handleChange}
        />

        <input
          type="file"
          onChange={handleImage}
        />

        <button type="submit">
          Create Task
        </button>

      </form>

    </div>
  );
}

export default AddTask;
