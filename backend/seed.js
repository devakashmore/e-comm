import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import { User } from "./model/user.model.js";
import { Product } from "./model/product.model.js";
import { Order } from "./model/order.model.js";
import bcryptjs from "bcryptjs";

const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    // Connect to database
    await connectDB();

    // Clear existing data
    console.log("🗑️ Clearing existing data...");
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});

    // ==================== SEED USERS ====================
    console.log("👥 Seeding users...");
    const hashedPasswords = {
      admin: await bcryptjs.hash("admin123", 10),
      user: await bcryptjs.hash("user123", 10),
    };

    const users = await User.insertMany([
      {
        name: "admin user",
        email: "admin@ecommerce.com",
        password: hashedPasswords.admin,
        role: "admin",
        verified: true,
      },
      {
        name: "john doe",
        email: "john@example.com",
        password: hashedPasswords.user,
        role: "user",
        verified: true,
      },
      {
        name: "jane smith",
        email: "jane@example.com",
        password: hashedPasswords.user,
        role: "user",
        verified: true,
      },
      {
        name: "alex johnson",
        email: "alex@example.com",
        password: hashedPasswords.user,
        role: "user",
        verified: true,
      },
      {
        name: "sarah williams",
        email: "sarah@example.com",
        password: hashedPasswords.user,
        role: "user",
        verified: false,
      },
    ]);
    console.log(`✅ ${users.length} users created`);

    // ==================== SEED PRODUCTS ====================
    console.log("📦 Seeding products...");
    const products = await Product.insertMany([
      // Electronics
      {
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 89.99,
        category: "Electronics",
        stock: 50,
        imageUrls: "https://via.placeholder.com/400?text=Wireless+Headphones",
        ratings: 4.5,
        numReviews: 128,
      },
      {
        name: "USB-C Cable",
        description: "Durable USB-C charging and data transfer cable",
        price: 12.99,
        category: "Electronics",
        stock: 200,
        imageUrls: "https://via.placeholder.com/400?text=USB-C+Cable",
        ratings: 4.2,
        numReviews: 350,
      },
      {
        name: "4K Webcam",
        description: "Crystal clear 4K resolution webcam for streaming",
        price: 149.99,
        category: "Electronics",
        stock: 30,
        imageUrls: "https://via.placeholder.com/400?text=4K+Webcam",
        ratings: 4.7,
        numReviews: 89,
      },
      // Clothing
      {
        name: "Cotton T-Shirt",
        description: "Comfortable 100% organic cotton t-shirt",
        price: 24.99,
        category: "Clothing",
        stock: 100,
        imageUrls: "https://via.placeholder.com/400?text=Cotton+T-Shirt",
        ratings: 4.3,
        numReviews: 256,
      },
      {
        name: "Denim Jeans",
        description: "Classic blue denim jeans with perfect fit",
        price: 59.99,
        category: "Clothing",
        stock: 75,
        imageUrls: "https://via.placeholder.com/400?text=Denim+Jeans",
        ratings: 4.6,
        numReviews: 412,
      },
      {
        name: "Winter Jacket",
        description: "Warm and stylish winter jacket with waterproof coating",
        price: 129.99,
        category: "Clothing",
        stock: 40,
        imageUrls: "https://via.placeholder.com/400?text=Winter+Jacket",
        ratings: 4.4,
        numReviews: 178,
      },
      // Books
      {
        name: "JavaScript Guide",
        description: "Comprehensive guide to modern JavaScript programming",
        price: 34.99,
        category: "Books",
        stock: 60,
        imageUrls: "https://via.placeholder.com/400?text=JavaScript+Guide",
        ratings: 4.8,
        numReviews: 234,
      },
      {
        name: "Node.js Mastery",
        description: "Master backend development with Node.js",
        price: 39.99,
        category: "Books",
        stock: 45,
        imageUrls: "https://via.placeholder.com/400?text=Node.js+Mastery",
        ratings: 4.7,
        numReviews: 156,
      },
      // Home & Kitchen
      {
        name: "Coffee Maker",
        description: "Automatic coffee maker with thermal carafe",
        price: 79.99,
        category: "Home & Kitchen",
        stock: 35,
        imageUrls: "https://via.placeholder.com/400?text=Coffee+Maker",
        ratings: 4.5,
        numReviews: 267,
      },
      {
        name: "Stainless Steel Pot Set",
        description: "10-piece cookware set with heat-resistant handles",
        price: 119.99,
        category: "Home & Kitchen",
        stock: 25,
        imageUrls: "https://via.placeholder.com/400?text=Pot+Set",
        ratings: 4.6,
        numReviews: 189,
      },
      // Sports & Outdoors
      {
        name: "Running Shoes",
        description: "Lightweight running shoes with cushioning technology",
        price: 99.99,
        category: "Sports & Outdoors",
        stock: 80,
        imageUrls: "https://via.placeholder.com/400?text=Running+Shoes",
        ratings: 4.4,
        numReviews: 523,
      },
      {
        name: "Yoga Mat",
        description: "Premium non-slip yoga mat with carrying strap",
        price: 44.99,
        category: "Sports & Outdoors",
        stock: 90,
        imageUrls: "https://via.placeholder.com/400?text=Yoga+Mat",
        ratings: 4.5,
        numReviews: 312,
      },
    ]);
    console.log(`✅ ${products.length} products created`);

    // ==================== SEED ORDERS ====================
    console.log("📋 Seeding orders...");
    const orders = await Order.insertMany([
      {
        user: users[1]._id, // john@example.com
        items: [
          {
            product: products[0]._id, // Wireless Headphones
            quantity: 1,
            price: 89.99,
          },
          {
            product: products[1]._id, // USB-C Cable
            quantity: 2,
            price: 12.99,
          },
        ],
        totalAmount: 115.97,
        address: {
          fullname: "John Doe",
          street: "123 Main Street",
          city: "New York",
          postalCode: "10001",
          country: "United States",
        },
        status: "delivered",
        paymentId: "pay_1234567890",
      },
      {
        user: users[2]._id, // jane@example.com
        items: [
          {
            product: products[4]._id, // Denim Jeans
            quantity: 1,
            price: 59.99,
          },
          {
            product: products[3]._id, // Cotton T-Shirt
            quantity: 2,
            price: 24.99,
          },
        ],
        totalAmount: 109.97,
        address: {
          fullname: "Jane Smith",
          street: "456 Oak Avenue",
          city: "Los Angeles",
          postalCode: "90001",
          country: "United States",
        },
        status: "shipped",
        paymentId: "pay_0987654321",
      },
      {
        user: users[3]._id, // alex@example.com
        items: [
          {
            product: products[8]._id, // Coffee Maker
            quantity: 1,
            price: 79.99,
          },
          {
            product: products[9]._id, // Stainless Steel Pot Set
            quantity: 1,
            price: 119.99,
          },
        ],
        totalAmount: 199.98,
        address: {
          fullname: "Alex Johnson",
          street: "789 Elm Street",
          city: "Chicago",
          postalCode: "60601",
          country: "United States",
        },
        status: "pending",
        paymentId: "pay_1122334455",
      },
      {
        user: users[1]._id, // john@example.com
        items: [
          {
            product: products[10]._id, // Running Shoes
            quantity: 1,
            price: 99.99,
          },
          {
            product: products[11]._id, // Yoga Mat
            quantity: 1,
            price: 44.99,
          },
        ],
        totalAmount: 144.98,
        address: {
          fullname: "John Doe",
          street: "123 Main Street",
          city: "New York",
          postalCode: "10001",
          country: "United States",
        },
        status: "delivered",
        paymentId: "pay_5566778899",
      },
      {
        user: users[2]._id, // jane@example.com
        items: [
          {
            product: products[6]._id, // JavaScript Guide
            quantity: 1,
            price: 34.99,
          },
          {
            product: products[7]._id, // Node.js Mastery
            quantity: 1,
            price: 39.99,
          },
        ],
        totalAmount: 74.98,
        address: {
          fullname: "Jane Smith",
          street: "456 Oak Avenue",
          city: "Los Angeles",
          postalCode: "90001",
          country: "United States",
        },
        status: "pending",
        paymentId: null,
      },
    ]);
    console.log(`✅ ${orders.length} orders created`);

    // ==================== SUMMARY ====================
    console.log("\n");
    console.log("🎉 Database seeding completed successfully!");
    console.log("════════════════════════════════════════");
    console.log(`Users created: ${users.length}`);
    console.log(`Products created: ${products.length}`);
    console.log(`Orders created: ${orders.length}`);
    console.log("════════════════════════════════════════");
    console.log("\n📝 Test Credentials:");
    console.log("   Admin Email: admin@ecommerce.com");
    console.log("   Admin Password: admin123");
    console.log("   User Email: john@example.com");
    console.log("   User Password: user123");

    // Close database connection
    await mongoose.connection.close();
    console.log("\n✅ Database connection closed");
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
