import mongoose from 'mongoose';

const taskModel= new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
     createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin' 
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manager' 
    }
});
const Task = mongoose.model('Task', taskModel);

export default Task;