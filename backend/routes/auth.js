const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db");

// Home page 

router.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

res.json({
  success: true,
  user: {
    id: student.id,
    roll_no: student.roll_no,
    role: "student"
  }
});


module.exports = router;
