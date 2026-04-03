import bcrypt from 'bcrypt';
import Admin from '../models/admin.model.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import Employee from '../models/employee.model.js';
import Task from '../models/task.model.js';
const adminController = {
    dashboard(req, res) {
        res.render('pages/admin/dashboard')
    },
    async signin(req, res) {
        try {

            const { password } = req.body
            req.body.password = await bcrypt.hash(password, 10)
            const admin = await Admin.create(req.body)
            return res.json(admin)
        } catch (error) {
            console.error(error);
            res.status(500).send('Error creating admin');
        }
    },
    loginPage(req, res) {
        res.render('./pages/admin/login.ejs')
    },
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const admin = await Admin.findOne({ email });
            if (!admin) {
                return res.redirect(req.get('Referrer') || '/admin/login');
            }
            else {
                const isMatch = await bcrypt.compare(password, admin.password);
                if (isMatch) {
                    // Store admin info in session
                    const payload = {
                        id: admin._id,
                        name: admin.name,
                        role: admin.role
                    }
                    const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });
                    res.cookie('token', token);
                    return res.redirect('/');
                }
            }
        }
        catch (error) {
            console.error(error);
            return res.redirect(req.get('Referrer') || '/admin/login');
        }
    },
    createEmployeePage(req, res) {
        res.render('./pages/admin/createEmployee.ejs')
    },
    async createEmployee(req, res) {
        try {
            const { password } = req.body;
            req.body.password = await bcrypt.hash(password, 10);
            await Employee.create(req.body);
            console.log(req.body);

            return res.redirect('/admin/viewEmployees');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error creating employee');
        }
    },
    async viewEmployeesPage(req, res) {
        try {
            const employees = await Employee.find();
            res.render('./pages/admin/viewEmployees.ejs', { employees });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching employees');
        }

    },
    async deleteEmployee(req, res) {
        try {
            const { id } = req.params;
            await Employee.findByIdAndDelete(id);
            return res.redirect('/admin/viewEmployees');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error deleting employee');
        }
    },
    async editEmployeePage(req, res) {
        try {
            const { id } = req.params;
            const employee = await Employee.findById(id);
            res.render('./pages/admin/editEmployee.ejs', { employee });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching employee');
        }
    },
    async editEmployee(req, res) {
        try {
            const { id } = req.params;
            const { password } = req.body;
            req.body.password = await bcrypt.hash(password, 10);
            await Employee.findByIdAndUpdate(id, req.body,);
            return res.redirect('/admin/viewEmployees');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error updating employee');
        }
    },
    async createTaskPage(req, res) {
        try {
            const employees = await Employee.find({});
            res.render('./pages/admin/addTask.ejs', { employees });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching employees');
        }

    },
    async createTask(req, res) {
        try {
            const task = await Task.create(req.body);
            return res.redirect('/admin/viewTasks');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error creating task');
        }
    },
    async viewTasksPage(req, res) {
        try {
            const tasks = await Task.find().populate('assignedTo').populate('createdby');
            res.render('./pages/admin/viewTasks.ejs', { tasks, admin: req.admin });
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Error fetching tasks');

        }
    }
}
export default adminController;