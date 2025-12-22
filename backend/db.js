const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "WJ28@krhps",
    database: "college_complaints"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed ❌");
    } else {
        console.log("MySQL Connected ✅");
    }
});

module.exports = db;
