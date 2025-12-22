const express = require("express");
const router = express.Router();
const db = require("../db");

/* =========================
   ADMIN LOGIN API
========================= */
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.query(
        "SELECT * FROM admins WHERE username = ?",
        [username],
        (err, result) => {
            if (err) {
                return res.json({ success: false, message: "DB error" });
            }

            if (result.length === 0) {
                return res.json({ success: false, message: "Admin not found" });
            }

            if (password === result[0].password) {
                req.session.admin = result[0];
                return res.json({ success: true });
            } else {
                return res.json({ success: false, message: "Wrong password" });
            }
        }
    );
});

/* =========================
   ADMIN DASHBOARD API
========================= */
router.get("/dashboard", (req, res) => {
    if (!req.session.admin) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const sectionId = req.session.admin.section_id;

    db.query(
        `SELECT complaints.*, students.roll_no 
         FROM complaints
         JOIN students ON complaints.student_id = students.id
         WHERE complaints.section_id = ?`,
        [sectionId],
        (err, complaints) => {
            if (err) {
                return res.json({ message: "DB error" });
            }
            res.json(complaints);
        }
    );
});

/* =========================
   UPDATE COMPLAINT STATUS
========================= */
router.post("/update-status", (req, res) => {
    if (!req.session.admin) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { id, status } = req.body;

    db.query(
        "UPDATE complaints SET status = ? WHERE id = ?",
        [status, id],
        () => res.json({ success: true })
    );
});

/* =========================
   ADMIN LOGOUT
========================= */
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true });
    });
});

// ADMIN ANALYTICS CHART API
router.get("/analytics", (req, res) => {
    if (!req.session.admin) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const sectionId = req.session.admin.section_id;

    const query = `
        SELECT status, COUNT(*) as count
        FROM complaints
        WHERE section_id = ?
        GROUP BY status
    `;

    db.query(query, [sectionId], (err, results) => {
        if (err) return res.json({});

        const stats = {
            Submitted: 0,
            "In Progress": 0,
            Resolved: 0,
            Rejected: 0
        };

        results.forEach(r => {
            stats[r.status] = r.count;
        });

        res.json(stats);
    });
});

// SINGLE COMPLAINT DETAILS
router.get("/complaint/:id", (req, res) => {
    if (!req.session.admin) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const id = req.params.id;

    const query = `
        SELECT complaints.*, students.roll_no, sections.section_name
        FROM complaints
        JOIN students ON complaints.student_id = students.id
        JOIN sections ON complaints.section_id = sections.id
        WHERE complaints.id = ?
    `;

    db.query(query, [id], (err, result) => {
        if (err || result.length === 0) {
            return res.json({});
        }
        res.json(result[0]);
    });
});


module.exports = router;
