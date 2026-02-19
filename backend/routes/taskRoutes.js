const express = require("express");
const router = express.Router();

// Store tasks in memory (temporary database)
let tasks = [];

// Add Task
router.post("/add", (req, res) => {

  const { title, description, location, startTime, endTime, email } = req.body;

  if (!title || !email)
  {
    return res.status(400).json({
      message: "Missing required fields"
    });
  }

  const newTask = {
    id: Date.now(),
    title,
    description,
    location,
    startTime,
    endTime,
    email
  };

  tasks.push(newTask);

  console.log("Task added:", newTask);

  res.json({
    message: "Task added successfully",
    task: newTask
  });

});

// Get My Tasks (filter by email)
router.get("/mytasks/:email", (req, res) => {

  const email = req.params.email;

  const userTasks = tasks.filter(task => task.email === email);

  res.json(userTasks);

});

// Get Feed (all tasks)
router.get("/feed", (req, res) => {

  res.json(tasks);

});

module.exports = router;
