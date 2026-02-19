const Task = require("../models/Task");

// CREATE TASK
exports.createTask = async (req,res) => {
    try {
        const task = await Task.create({
            title: req.body.title,
            description: req.body.description,
            user: req.user.id
        });

        res.status(201).json(task);

    } catch(err){
        res.status(500).json({ error: err.message });
    }
};


// GET ALL TASKS
exports.getTasks = async (req,res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch(err){
        res.status(500).json({ error: err.message });
    }
};


// UPDATE TASK
exports.updateTask = async (req,res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new:true }
        );

        res.json(task);
    } catch(err){
        res.status(500).json({ error: err.message });
    }
};


// DELETE TASK
exports.deleteTask = async (req,res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message:"Task deleted"});
    } catch(err){
        res.status(500).json({ error: err.message });
    }
};
