import express, { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { admin } from "../middlewares/admin.middleware.js";
import {getAdminStats} from "../controllers/anyaliticsController.controller.js"
const router = Router();

router.route("/").get(protect, admin , getAdminStats)

export default router;