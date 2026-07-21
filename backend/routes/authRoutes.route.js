import express, { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { admin } from "../middlewares/admin.middleware.js";
import {
  registerUSer,
  loginUSer,
  getUsers,
} from "../controllers/authController.controller.js";

const router = Router();

router.route("/register").post(registerUSer);
router.route("/login").post(loginUSer);
router.route("/users").get(protect, admin, getUsers);

export default router;
