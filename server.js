const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

/* ---------- Middleware ---------- */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------- Static Files ---------- */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ---------- Routes ---------- */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/files", require("./routes/fileRoutes"));

/* ---------- Default Route ---------- */
app.get("/", (req, res) => {
  res.send("Backend server is running 🚀");
});

/* ---------- Server ---------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
