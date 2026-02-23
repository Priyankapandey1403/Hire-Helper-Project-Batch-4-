import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddTask.css";

const AddTask = ({setTasks}) => {
const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    category: "",
    budget:""
  });
  const [image, setImage] = useState(null);



  const formatTime = (time) => {
  if (!time) return "";

  const [hour, minute] = time.split(":");
  let h = parseInt(hour);
  const ampm = h >= 12 ? "PM" : "AM";

  h = h % 12;
  h = h ? h : 12;

  return `${h}:${minute} ${ampm}`;
};

const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};


  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
       setImage(imageUrl);
       }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
        id: Date.now(),
        title: form.title,
        description: form.description,
        location: form.location,
        category:form.category,
        dateTime: `${formatDate(form.endDate)}, ${formatTime(form.startTime)} - ${formatTime(form.endTime)}`,
        image:image,
        budget:form.budget
    };
    setTasks(prev => [...prev, newTask]);
    
    navigate("/dashboard/my-tasks");
  };



  return (
    <div className="add-task-page">
      <div className="add-task-card">
        <h2>Add New Task</h2>
        <p>Create a task and find someone to help you</p>

        <form onSubmit={handleSubmit}>
          <h4>Task Title</h4>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            onChange={handleChange}
            required
          />
          <h4>Description</h4>
          <textarea
            name="description"
            placeholder="Describe what help you need..."
            rows="4"
            onChange={handleChange}
            required
          />
<h4>Location</h4>
          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
          />
<h4>Start Date & Time:</h4>
          <div className="row">
            <input
              type="date"
              name="startDate"
              onChange={handleChange}
            />
           
            <input
              type="time"
              name="startTime"
              onChange={handleChange}
            />
          </div>
<h4>End Date & Time:</h4>
          <div className="row">
            
            <input
              type="date"
              name="endDate"
              onChange={handleChange}
            />
          
            <input
              type="time"
              name="endTime"
              onChange={handleChange}
            />
          </div>
<h4>Category</h4>
          <select name="category" onChange={handleChange}>
            <option value="">Select Category</option>
            <option value="moving">Moving</option>
            <option value="tech">Tech</option>
            <option value="cleaning">Cleaning</option>
            <option value="painting">Painting</option>
          </select>
<h4>Budget</h4>
          <input
            type="text"
            name="budget"
            placeholder="Budget"
            onChange={handleChange}
            required
       />
<h4>Task Image</h4>
          <div className="upload-box">
            <p>Upload image (optional)</p>
            <input type = "file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleImageChange}/>
          </div>

          <button type="submit" className="primary-btn">
            Post Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
