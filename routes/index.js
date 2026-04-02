import { Router } from "express";

import adminRouter from "./admin.route.js";
import adminController from "../controllers/admin.controller.js";
import adminAuth from "../middlewares/adminAuth.js";

const router = Router();
router.get('/',adminAuth,adminController.dashboard)
router.use('/admin',adminRouter);

export default router;