# E-Commerce Backend API

Developed a scalable RESTful e-commerce backend using **Node.js, Express.js, MongoDB, and Mongoose**. Implemented secure **JWT authentication** with **bcryptjs** password hashing and **role-based authorization** for users and administrators. Built complete product and order management modules with CRUD operations, inventory tracking, image uploads via **Cloudinary**, payment integration using **Razorpay**, and email notifications using **Nodemailer**. Designed analytics endpoints for business insights and implemented secure middleware for authentication, request validation, and protected routes.

### Key Features

* User registration and login with JWT authentication.
* Password hashing using bcryptjs.
* Role-based access control (Admin/User).
* Product CRUD operations with Cloudinary image uploads.
* Order creation, order history, and order status management.
* Razorpay payment gateway integration.
* Email notifications using Nodemailer.
* Sales and order analytics APIs.
* RESTful API architecture following MVC design pattern.
* MongoDB database design using Mongoose schemas and references.
* Error handling and middleware-based authentication.
# 🛒 E-Commerce Backend API

A production-ready RESTful backend for an e-commerce application built with **Node.js**, **Express.js**, and **MongoDB**. The project provides secure authentication, product management, order processing, payment integration, image uploads, email notifications, and analytics.

---

# 🚀 Features

## Authentication

* User Registration
* User Login
* JWT Authentication
* Password Hashing using bcryptjs
* Role-Based Authorization (Admin/User)

---

## Product Management

* Create Product
* Update Product
* Delete Product
* Get All Products
* Get Product By ID
* Upload Product Images using Cloudinary & Multer

---

## Order Management

* Create Order
* Get Logged-in User Orders
* Get Order By ID
* Update Order Status (Admin)
* Order History

---

## Payment Integration

* Razorpay Payment Gateway
* Store Payment ID with Orders

---

## User Management

* Register Users
* Login Users
* Get All Users (Admin)

---

## Analytics

* Total Sales
* Total Revenue
* Total Orders
* User Statistics
* Product Statistics

---

# 🛠 Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Token)
* bcryptjs

### Image Storage

* Cloudinary
* Multer

### Payments

* Razorpay

### Email

* Nodemailer

### Utilities

* dotenv
* cors

---

# 📂 Project Structure

```
backend/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── uploads/
├── server.js
└── package.json
```

---

# API Endpoints

## Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |
| GET    | /api/auth/users    |

---

## Products

| Method | Endpoint       |
| ------ | -------------- |
| GET    | /api/products  |
| GET    | /api/products/ |
| POST   | /api/products  |
| PUT    | /api/products/ |
| DELETE | /api/products/ |

---

## Orders

| Method | Endpoint              |
| ------ | --------------------- |
| POST   | /api/orders           |
| GET    | /api/orders/my-orders |
| GET    | /api/orders/          |
| PUT    | /api/orders/status    |

---

## Analytics

| Method | Endpoint       |
| ------ | -------------- |
| GET    | /api/analytics |

---

# Installation

```bash
git clone https://github.com/yourusername/ecommerce-backend.git
```

```bash
cd ecommerce-backend
```

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret

EMAIL_USER=your_email
EMAIL_PASS=your_password
```

Run the server:

```bash
npm run dev
```

---

# Future Improvements

* Product Search
* Category Filters
* Pagination
* Wishlist
* Shopping Cart
* Product Reviews & Ratings
* Coupon System
* Order Tracking
* Inventory Notifications
* Refresh Token Authentication
* Docker Deployment
* Unit & Integration Testing

---

# Author

**Akash More**

If you found this project useful, consider giving it a ⭐ on GitHub.
