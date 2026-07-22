import express, { Router } from "express";
import {createdOrder , verifyPayment} from "../controllers/paymentController.controller.js"
// import { protect } from "../middlewares/auth.middleware.js";
// import { admin } from "../middlewares/admin.middleware.js";

const router = Router();

router.route("/order").post(createdOrder)
router.route("/verify").post(verifyPayment)


export default router;



