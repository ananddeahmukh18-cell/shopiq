const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/* ===== DATABASE ===== */
mongoose.connect("mongodb://127.0.0.1:27017/shopiq", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("MongoDB Connected");

/* ===== MODELS ===== */
const Sale = mongoose.model("Sale", {
  customer: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

/* ===== ROUTES ===== */

// Add Sale
app.post("/api/sale", async (req, res) => {
  const sale = new Sale(req.body);
  await sale.save();
  res.json({ success: true });
});

// Get Sales
app.get("/api/sales", async (req, res) => {
  const sales = await Sale.find().sort({ date: -1 });
  res.json(sales);
});

/* ===== START SERVER ===== */
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
