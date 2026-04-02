

const managerSchema = new mongoose.Schema({
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

const Manager = mongoose.model('Manager', managerSchema);

export default Manager;