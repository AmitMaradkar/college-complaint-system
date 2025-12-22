const express = require("express");
const db = require("../db");
const router = express.Router();

// STUDENT LOGIN API (for React)
router.post("/login", (req, res) => {
    const { roll_no, password } = req.body;

    db.query(
        "SELECT * FROM students WHERE roll_no = ?",
        [roll_no],
        (err, result) => {
            if (err) {
                return res.json({ success: false, message: "DB error" });
            }

            if (result.length === 0) {
                return res.json({ success: false, message: "Student not found" });
            }

            if (password === result[0].password) {
                req.session.student = result[0];
                return res.json({ success: true });
            } else {
                return res.json({ success: false, message: "Wrong password" });
            }
        }
    );
});



// STUDENT DASHBOARD DATA
router.get("/dashboard", (req, res) => {
    if (!req.session.student) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const studentId = req.session.student.id;

    db.query("SELECT * FROM sections", (err, sections) => {
        db.query(
            "SELECT * FROM complaints WHERE student_id = ?",
            [studentId],
            (err2, complaints) => {
                res.json({ sections, complaints });
            }
        );
    });
});



router.post("/complaint", (req, res) => {
    if (!req.session.student) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { section_id, title, description } = req.body;
    const student_id = req.session.student.id;

    db.query(
        "INSERT INTO complaints (student_id, section_id, title, description) VALUES (?, ?, ?, ?)",
        [student_id, section_id, title, description],
        () => res.json({ success: true })
    );
});


// Student register page
// STUDENT REGISTER API
router.post("/register", (req, res) => {
    const { roll_no, name, password } = req.body;

    if (!roll_no || !name || !password) {
        return res.json({ success: false, message: "All fields required" });
    }

    // Check if student already exists
    db.query(
        "SELECT * FROM students WHERE roll_no = ?",
        [roll_no],
        (err, result) => {
            if (result.length > 0) {
                return res.json({ success: false, message: "Student already exists" });
            }

            // Insert new student
            db.query(
                "INSERT INTO students (roll_no, name, password) VALUES (?, ?, ?)",
                [roll_no, name, password],
                () => res.json({ success: true })
            );
        }
    );
});


//Student logout

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true });
    });
});


module.exports = router;
