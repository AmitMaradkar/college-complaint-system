const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true
}));

app.set("view engine", "ejs");

app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}));

app.use(express.json()); // VERY IMPORTANT


const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");
const adminRoutes = require("./routes/admin");

app.use("/", authRoutes);
app.use("/student", studentRoutes);
app.use("/admin", adminRoutes);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

const cors = require("cors");

app.use(cors({
  origin: "*",   // allow frontend
  credentials: true
}));
