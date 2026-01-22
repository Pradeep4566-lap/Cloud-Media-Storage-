const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(403);
  req.user = jwt.verify(token, "secret");
  next();
};

router.post("/upload", auth, upload.single("file"), async (req, res) => {
  await pool.query(
    "INSERT INTO files(filename, path, user_id) VALUES($1,$2,$3)",
    [req.file.originalname, req.file.path, req.user.id]
  );
  res.json({ message: "File uploaded" });
});

router.get("/", auth, async (req, res) => {
  const files = await pool.query(
    "SELECT * FROM files WHERE user_id=$1",
    [req.user.id]
  );
  res.json(files.rows);
});

module.exports = router;
