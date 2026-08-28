const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const addressRoutes = require("./routes/addressRoutes");
const orderRoutes = require("./routes/orderRoutes");
//temp testing ke liye
const authMiddleware = require("./middleware/authMiddleware");


const app = express();

app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/orders", orderRoutes);


// Test
app.get("/", (req, res) => {
  res.json({
    message: "BookStore Backend is running",
  });
});
//temp testing ke liye
app.get("/api/test-protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user,
  });
});
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});