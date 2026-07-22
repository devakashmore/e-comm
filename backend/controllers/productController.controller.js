import { Product } from "../model/product.model.js";
import cloudinary from "../config/cloudinary.js";

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
    console.log(error);
  }
};

const getProductsById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({
        message: "Product NOt Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
    console.log(error);
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    let imageUrls = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log(result);
      imageUrls = result.secure_url;
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrls,
    });
    const saveProdcut = await product.save();
    res.status(201).json(saveProdcut);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
    console.log(error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;
      product.stock = stock || product.stock;

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result);
        product.imageUrls = result.secure_url;
      }

      const updateProduct = await product.save();
      res.json(updateProduct);
    } else {
      res.status(400).json({
        message: "Product Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({
        message: "Product Not Found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
    console.log(error);
  }
};
export {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};
