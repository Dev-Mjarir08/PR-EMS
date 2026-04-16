import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import Task from '../models/task.model.js';

const adminController = {
    //dashboard page
    dashboard(req, res) {
        res.render('pages/admin/dashboard')
    },
    //admin signup
    async signup(req, res) {

        try {
            const { password } = req.body
            req.body.password = await bcrypt.hash(password, 10)
            req.body.role = 'admin'
            const admin = await User.create(req.body)
            return res.json(admin)
        } catch (error) {
            res.status(500).json({
                message: 'Error creating admin',
                error
            })
        }
    },
    //admin login page
    loginPage(req, res) {
        res.render('./pages/admin/login')
    },
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.redirect(req.get('Referrer') || '/admin/login');
            }
            else {
                const isMatch = await bcrypt.compare(password, user.password);

                if (isMatch) {
                    // Store user info in token
                    const payload = {
                        id: user._id,
                        name: user.name,
                        role: user.role
                    };

                    const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });

                    res.cookie('token', token);
                    return res.redirect('/');

                }
                else {
                    return res.redirect(req.get('Referrer') || '/admin/login');
                }
            }
        }
        catch (error) {
            console.error(error);
            return res.redirect(req.get('Referrer') || '/admin/login');
        }
    },
    //admin logout
    logout(req, res) {
        res.clearCookie('token');
        return res.redirect('/admin/login');
    },
    //create employee page
    createEmployeePage(req, res) {
        res.render('./pages/admin/createEmployee')
    },

    //create employee
    async createEmployee(req, res) {
        try {
            const { password } = req.body
            req.body.password = await bcrypt.hash(password, 10)
            req.body.role = 'employee'
            await User.create(req.body)
            return res.redirect('/admin/viewEmployees')

        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error creating employee');
        }
    },
    //view employees
    async viewEmployees(req, res) {
        try {
            const employees = await User.find({ role: 'employee' })
            res.render('./pages/admin/viewEmployees', { employees })
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error fetching employees');
        }
    },
    //edit employee page
    async editEmployeePage(req, res) {
        try {
            const employee = await User.findById(req.params.id)
            res.render('./pages/admin/editEmployee', { employee })
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error fetching employee');
        }
    },
    //edit employee
    async editEmployee(req, res) {
        try {
            const { password } = req.body
            if (password) {
                req.body.password = await bcrypt.hash(password, 10)
            }
            await User.findByIdAndUpdate(req.params.id, req.body)
            return res.redirect('/admin/viewEmployees')
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error updating employee');
        }

    },
    //delete employee
    async deleteEmployee(req, res) {
        try {
            await User.findByIdAndDelete(req.params.id)
            return res.redirect('/admin/viewEmployees')
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error deleting employee');
        }
    },

    //add task page
    async addTaskPage(req, res) {
        try {
            const employees = await User.find({ role: 'employee' })
            res.render('./pages/admin/addTask', { employees })
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error fetching employees');
        }
    },
    //add task
    async addTask(req, res) {
        try {
            const { name, description, assignedTo } = req.body
            const tasks = await Task.create({ name, description, assignedTo, createdBy: req.user.id })
            console.log("REQ.USER:", req.user);

            console.log("CreatedBy:", tasks.createdBy);
            return res.redirect('/admin/viewTasks')
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error creating task');
        }

    },
    //view tasks
    async viewTasks(req, res) {
        try {
            let tasks;

            // ✅ Admin ya Manager → sab tasks
            if (req.user.role === 'admin' || req.user.role === 'manager') {
                tasks = await Task.find().populate('createdBy').populate('assignedTo')
            }
            // ✅ Employee → sirf apne tasks
            else {
                tasks = await Task.find({ assignedTo: req.user.id }).populate('createdBy').populate('assignedTo')
            }

            res.render('pages/admin/viewTasks', { tasks });

        } catch (error) {
            console.log(error);
            res.status(500).send("Error loading tasks");
        }
    },
    //edit task page
    async editTaskPage(req, res) {
        try {
            const task = await Task.findById(req.params.id)
            const employees = await User.find({ role: 'employee' })
            res.render('./pages/admin/editTasks', { task, employees })
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error fetching task');
        }
    },
    //edit task
    async editTask(req, res) {
        try {
            const { name, description, createdBy, assignedTo } = req.body
            await Task.findByIdAndUpdate(req.params.id, { name, description, createdBy, assignedTo })
            return res.redirect('/admin/viewTasks')
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error updating task');
        }
    },
    //delete task
    async deleteTask(req, res) {
        try {
            await Task.findByIdAndDelete(req.params.id)
            return res.redirect('/admin/viewTasks')
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error deleting task');
        }
    },

    //create manager page
    createManagerPage(req, res) {
        res.render('./pages/admin/createManager')
    },
    //create manager
    async createManager(req, res) {
        try {
            const { password } = req.body
            req.body.password = await bcrypt.hash(password, 10)
            req.body.role = 'manager'
            await User.create(req.body)
            console.log("Manager Created");
            return res.redirect('/admin/viewManagers')
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error creating manager');
        }
    },
    //view managers
    async viewManagers(req, res) {
        try {
            const managers = await User.find({ role: 'manager' })
            res.render('./pages/admin/viewManagers', { managers })
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error fetching managers');
        }
    },
    //delete manager
    async deleteManager(req, res) {
        try {
            await User.findByIdAndDelete(req.params.id)
            return res.redirect('/admin/viewManagers')
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error deleting manager');
        }
    },
    //edit manager page
    async editManagerPage(req, res) {
        try {
            const manager = await User.findById(req.params.id)
            res.render('./pages/admin/editmanager', { manager })
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error fetching manager');
        }
    },
    //edit manager
    async editManager(req, res) {
        try {
            const { password } = req.body
            if (password) {
                req.body.password = await bcrypt.hash(password, 10)
            }
            await User.findByIdAndUpdate(req.params.id, req.body)
            return res.redirect('/admin/viewManagers')
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error updating manager');
        }
    }
}
export default adminController;
