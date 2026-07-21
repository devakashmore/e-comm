// server / index.js

import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.route.js"
// db connection
connectDB()

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const PORT = process.env.PORT || 8000;


app.get("/", (req, res) => {
  res.send("url working properly");
});

app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
  console.log(`server is up and Running on port : ${PORT}`);
});
