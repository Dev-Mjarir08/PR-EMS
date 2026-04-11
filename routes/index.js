import { Router } from "express";
import adminRouter from "./admin.route.js";
import userAuth from "../middleware/userAuth.js";
import adminController from "../controller/admin.controller.js";
import employeeRouter from "./employee.route.js";

const router= Router();

router.get('/',userAuth,adminController.dashboard)
router.use('/admin',adminRouter)
router.use('/employee', employeeRouter)

export default router;  