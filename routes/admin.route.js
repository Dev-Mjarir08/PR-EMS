import { Router } from "express";
import adminController from "../controllers/admin.controller.js";
import adminAuth from "../middlewares/adminAuth.js";

const adminRouter = Router();

adminRouter.get('/login', adminController.loginPage);
adminRouter.post('/login', adminController.login);
adminRouter.post('/signin', adminController.signin);
export default adminRouter;