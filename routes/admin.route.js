import { Router } from "express";
import adminController from "../controllers/admin.controller.js";
import adminAuth from "../middlewares/adminAuth.js";

const adminRouter = Router();

adminRouter.get('/login', adminController.loginPage);
adminRouter.post('/login', adminController.login);
adminRouter.post('/signin', adminController.signin);
//employyeee routes
adminRouter.get('/createEmployee', adminAuth, adminController.createEmployeePage);
adminRouter.post('/createEmployee', adminAuth, adminController.createEmployee);
adminRouter.get('/viewEmployees', adminAuth, adminController.viewEmployeesPage);
adminRouter.get('/delete/:id', adminAuth, adminController.deleteEmployee);
adminRouter.get('/edit/:id', adminAuth, adminController.editEmployeePage);
adminRouter.post('/edit/:id', adminAuth, adminController.editEmployee);

//add Task routes here
adminRouter.get('/addTask', adminAuth, adminController.createTaskPage);
adminRouter.post('/addTask', adminAuth, adminController.createTask);
adminRouter.get('/viewTasks', adminAuth, adminController.viewTasksPage);

export default adminRouter;