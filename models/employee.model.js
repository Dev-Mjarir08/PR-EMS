import mongoose from "mongoose";


const employeeSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: 'admin'
  }
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;