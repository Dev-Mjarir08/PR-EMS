import { Router } from "express";
import userAuth from "../middleware/userAuth.js";
import managerController from "../controller/manager.controller.js";

const managerRouter = Router();

managerRouter.get('/dashboard',userAuth, managerController.dashboard)

export default managerRouter;