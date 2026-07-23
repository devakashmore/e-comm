import express, { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { admin } from "../middlewares/admin.middleware.js";

import {createOrder , getOrder, updateOrderStatus , getMyOrderById} from "../controllers/orderController.controller.js"

const router = Router();

router.route("/").post(protect, createOrder).get(protect, admin, getOrder);
router.route("/:id/status").put(protect, admin, updateOrderStatus);

// my orders
router.route("/myorders").get(protect, getMyOrderById);

export default router;
