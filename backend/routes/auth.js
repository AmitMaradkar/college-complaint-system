const express = require("express");
const router = express.Router();

// Base route
router.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

// Student Login
router.post("/login", (req, res) => {
  const { roll_no, password } = req.body;
  // TODO: your DB logic here...

  res.json({ success: true });
});

// Export router
module.exports = router;

