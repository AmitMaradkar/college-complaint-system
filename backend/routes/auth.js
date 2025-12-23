const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../db");

// Home page 

router.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});


module.exports = router;
