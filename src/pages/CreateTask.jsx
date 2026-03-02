import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import "../styles/CreateTask.css";

const CreateTask = ({ addTask }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    image: null,
  });

  const [isActive, setIsActive] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      ...formData,
      user: "Riya",
    };

    addTask(newTask);
    navigate("/dashboard/my-tasks");
  };

  return (
    <div className="create-task-page">
      
      {/* Header Section */}
      <div className="page-header">
        <div className="header-left">
          <h1>Add Task</h1>
          <p>Create a task and find someone to help you</p>
        </div>

        <div className="header-right">
          <input
            type="text"
            placeholder="Search tasks..."
            className="search-input"
          />

          {/* 🔔 Notification Bell */}
          <div
            className={`notification ${isActive ? "active" : ""}`}
            onClick={() => setIsActive(!isActive)}
          >
            <FiBell className="bell-icon" />
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="create-task-container">
        <h2>Create New Task</h2>
        <p className="subtitle">
          Post a task and find someone to help you
        </p>

        <form className="task-form" onSubmit={handleSubmit}>
          
          <label>Task Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Help moving furniture"
            onChange={handleChange}
            required
          />

          <label>Description</label>
          <textarea
            name="description"
            placeholder="Describe what help you need..."
            onChange={handleChange}
            required
          />

          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            onChange={handleChange}
            required
          />

          <div className="row">
            <div>
              <label>Start Date</label>
              <input type="date" name="startDate" onChange={handleChange} />
            </div>

            <div>
              <label>Start Time</label>
              <input type="time" name="startTime" onChange={handleChange} />
            </div>
          </div>

          <div className="row">
            <div>
              <label>End Date (Optional)</label>
              <input type="date" name="endDate" onChange={handleChange} />
            </div>

            <div>
              <label>End Time (Optional)</label>
              <input type="time" name="endTime" onChange={handleChange} />
            </div>
          </div>

          <label>Category</label>
          <select name="category" onChange={handleChange}>
            <option value="">Select a category</option>
            <option value="tech">Tech</option>
            <option value="home">Home Service</option>
            <option value="car">Car Care</option>
            <option value="event">Event Help</option>
          </select>

          <label>Task Image (Optional)</label>
          <div className="image-upload-box">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className="upload-content">
              <span className="upload-icon">☁</span>
              <p>Upload a file or drag and drop</p>
              <small>PNG, JPG, GIF up to 10MB</small>
            </div>
          </div>

          <div className="button-row">
            <button type="submit" className="post-btn">
              Post Task
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateTask;