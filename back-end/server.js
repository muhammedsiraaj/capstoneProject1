import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoute.js";

// App configuration
const app = express();
const PORT = process.env.PORT || 4012; 

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.get("/", (req, res) => {
  res.send("API is Working");
});

// Start the server and handle port conflicts
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}).on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Server running on http://localhost:${PORT}`);
    app.listen(0); 
  } else {
    console.error("Error starting the server:", err);
  }
});
