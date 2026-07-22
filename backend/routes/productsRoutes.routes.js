import express, { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { admin } from "../middlewares/admin.middleware.js";
import {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.controller.js";
import multer from "multer";
  

const upload = multer({ dest: "uploads/" });



const router = Router();

// it will return and also upload the product
router
  .route("/")
  .get(getProducts)
  .post(protect, admin, upload.single("imageUrls"), createProduct);

// specific product
router
  .route("/:id")
  .get(getProductsById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin,upload.single("imageUrls"), deleteProduct);

export default router;
