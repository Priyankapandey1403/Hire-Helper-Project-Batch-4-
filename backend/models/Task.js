const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    location: String,
    startTime: Date,
    endTime: Date,
    picture: String
},
{ timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
