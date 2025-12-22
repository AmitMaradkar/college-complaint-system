const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// CORS (allow frontend)
app.use(cors({
  origin: "*",
  credentials: true
}));

// Session
app.use(session({
  secret: "secretkey",
  resave: false,
  saveUninitialized: true
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
  console.log(`Server running on port ${PORT}`);
});
