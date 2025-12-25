const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// CORS (allow frontend)
const cors = require("cors");
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST"],
  credentials: true
}));



// Routes
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");
const adminRoutes = require("./routes/admin");

app.use("/", authRoutes);
app.use("/student", studentRoutes);
app.use("/admin", adminRoutes);

// IMPORTANT: Use Render PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});
