import express, { Router } from "express";
import {registerUSer , loginUSer ,logoutUSer} from "../controllers/authController.controller.js"
const router = Router();

router.route("/register").post(registerUSer);
router.route("/login").post(loginUSer);
router.route("/user").post(logoutUSer);
