import  { Router } from "express";
import employeeController from "../controller/employee.controller.js";
import userAuth from "../middleware/userAuth.js";

const employeeRouter= Router();

employeeRouter.get('/dashboard',userAuth,employeeController.dashboard)

export default employeeRouter;