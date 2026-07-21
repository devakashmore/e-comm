import { Product } from "../model/product.model.js";
import cloudinary from "../config/cloudinary.js";

const getProducts = async (req, res) => {
  try {
    const productss = await Product.find({});
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
    let imgUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imgUrl = result.secure_url;
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
