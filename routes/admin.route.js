import { Router } from "express";
import adminController from "../controller/admin.controller.js";
import userAuth from "../middleware/userAuth.js";

const adminRouter = Router();

// Define admin routes here


adminRouter.post('/signup', adminController.signup);
adminRouter.get('/login', adminController.loginPage);
adminRouter.post('/login', adminController.login);
adminRouter.get('/logout', userAuth, adminController.logout);

// Employee Routes

adminRouter.get('/createEmployee', userAuth, adminController.createEmployeePage);
adminRouter.post('/createEmployee', userAuth, adminController.createEmployee);
adminRouter.get('/viewEmployees', userAuth, adminController.viewEmployees);
adminRouter.get('/delete/:id', userAuth, adminController.deleteEmployee);
adminRouter.get('/edit/:id', userAuth, adminController.editEmployeePage);
adminRouter.post('/edit/:id', userAuth, adminController.editEmployee);
//add Tasks

adminRouter.get('/addTask', userAuth, adminController.addTaskPage);
adminRouter.post('/addTask', userAuth, adminController.addTask);
adminRouter.get('/viewTasks', userAuth, adminController.viewTasks);
adminRouter.get('/deleteTask/:id', userAuth, adminController.deleteTask);
adminRouter.get('/editTask/:id', userAuth, adminController.editTaskPage);
adminRouter.post('/editTask/:id', userAuth, adminController.editTask);

// Manager Routes

adminRouter.get('/createManager', userAuth, adminController.createManagerPage);
adminRouter.post('/createManager', userAuth, adminController.createManager);
adminRouter.get('/viewManagers', userAuth, adminController.viewManagers);
adminRouter.get('/deleteManager/:id', userAuth, adminController.deleteManager);
adminRouter.get('/editManager/:id', userAuth, adminController.editManagerPage);
adminRouter.post('/editManager/:id', userAuth, adminController.editManager);

export default adminRouter;