// server / index.js

import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import {} from "./routes/authRoutes.route.js"
// db connection
connectDB()

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8000;


app.get("/", (req, res) => {
  res.send("url working properly");
});

app.use('api/v1/auth', aut)

app.listen(PORT, () => {
  console.log(`server is up and Running on port : ${PORT}`);
});
