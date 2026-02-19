const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
