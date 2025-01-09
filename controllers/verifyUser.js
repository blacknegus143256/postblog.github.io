// middleware/verifyUser.js
const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");

module.exports = (req, res, next) => {
    const token = req.cookies.userRegistered;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Unauthorized" });
        
        db.query("SELECT * FROM users WHERE id = ?", [decoded.id], (error, results) => {
            if (error || results.length === 0) return res.status(401).json({ error: "Unauthorized" });
            req.user = results[0];
            next();
        });
    });
};
