import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
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

  const [preview, setPreview] = useState(null);

  // Handle text input
  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    });
  };

  // Handle image upload + preview
  const handleImage = (e) => {

    const file = e.target.files[0];

    setTask({
      ...task,
      picture: file
    });

    if(file)
    {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit task
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Get logged-in user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("User not logged in");
      return;
    }
    // Add email to task
    const taskWithUser = {
      ...task,
      email: user.email
    };
    try {
      // If picture is present, use FormData
      if (task.picture) {
        const formData = new FormData();
        Object.entries(taskWithUser).forEach(([key, value]) => {
          formData.append(key, value);
        });
        const response = await fetch("http://localhost:5000/api/tasks/add", {
          method: "POST",
          body: formData
        });
        const data = await response.json();
        alert(data.message);
      } else {
        const response = await fetch("http://localhost:5000/api/tasks/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(taskWithUser)
        });
        const data = await response.json();
        alert(data.message);
      }
      // Clear form
      setTask({
        title: "",
        description: "",
        location: "",
        startTime: "",
        endTime: "",
        picture: null
      });
      setPreview(null);
    } catch (error) {
      console.error(error);
      alert("Backend not connected");
    }
  };

  return (

    <div className="dashboard-container">

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="dashboard-content">

        <h2>Add New Task</h2>

        <div className="card">

          <form onSubmit={handleSubmit}>

            <label>Task Title</label>
            <input
              name="title"
              value={task.title}
              placeholder="Enter task title"
              onChange={handleChange}
              required
            />

            <label>Description</label>
            <textarea
              name="description"
              value={task.description}
              placeholder="Enter description"
              onChange={handleChange}
              required
            />

            <label>Location</label>
            <input
              name="location"
              value={task.location}
              placeholder="Enter location"
              onChange={handleChange}
              required
            />

            <label>Start Time</label>
            <input
              type="datetime-local"
              name="startTime"
              value={task.startTime}
              onChange={handleChange}
              required
            />

            <label>End Time</label>
            <input
              type="datetime-local"
              name="endTime"
              value={task.endTime}
              onChange={handleChange}
            />

            <label>Upload Picture</label>
            <input
              type="file"
              onChange={handleImage}
            />

            {/* Image preview */}
            {preview && (
              <img
                src={preview}
                alt="preview"
                style={{
                  width: "200px",
                  marginTop: "10px",
                  borderRadius: "8px"
                }}
              />
            )}

            <button type="submit" style={{marginTop:"15px"}}>
              Create Task
            </button>

          </form>

        </div>

      </div>

    </div>

  );
}

export default AddTask;
