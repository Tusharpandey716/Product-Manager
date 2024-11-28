const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// Database setup
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
    db.run(`CREATE TABLE mappings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        standard_name TEXT NOT NULL,
        variation TEXT NOT NULL
    )`);

    // Seed data
    db.run(`INSERT INTO mappings (standard_name, variation) VALUES
        ('A4 Paper 500 Sheets', 'A4 Paper 500sh'),
        ('A4 Paper 500 Sheets', 'A4 Copy Paper 500 sheets'),
        ('A4 Paper 500 Sheets', '500 Sheets A4'),
        ('Sticky Notes 3x3 Yellow', 'Sticky Notes 3x3'),
        ('Sticky Notes 3x3 Yellow', 'Post-it Notes 3x3 Yellow'),
        ('Sticky Notes 3x3 Yellow', '3x3 Yellow Sticky Notes')
    `);
});

// Normalize text function
const normalizeText = (text) => text.toLowerCase().trim().replace(/\s+/g, " ");

// Find match endpoint
app.post("/find", (req, res) => {
    const { product } = req.body;
    const normalizedProduct = normalizeText(product);

    db.all(`SELECT standard_name FROM mappings WHERE lower(variation) = ?`, [normalizedProduct], (err, rows) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (rows.length > 0) {
            res.json({ match: rows[0].standard_name });
        } else {
            res.json({ match: null });
        }
    });
});

// Add mapping endpoint
app.post("/add", (req, res) => {
    const { standardName, newVariation } = req.body;

    db.run(
        `INSERT INTO mappings (standard_name, variation) VALUES (?, ?)`,
        [standardName, newVariation],
        (err) => {
            if (err) return res.status(500).json({ success: false, error: "Database error" });
            res.json({ success: true });
        }
    );
});

// Get all mappings
app.get("/mappings", (req, res) => {
    db.all(`SELECT standard_name, variation FROM mappings`, (err, rows) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(rows);
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
