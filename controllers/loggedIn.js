// controllers/loggedIn.js
const db = require("../routes/db-config");
const jwt = require("jsonwebtoken");

const loggedIn = (req, res, next) => {
    console.log("Checking login status...");
    if (!req.cookies.userRegistered) {
        req.status = "loggedOut";
        req.user = null;  // Set `req.user` to null when logged out
        console.log("User is logged out, no token found.");
        return next();
    }

    try {
        const decoded = jwt.verify(req.cookies.userRegistered, process.env.JWT_SECRET);
        console.log("Token decoded:", decoded);
        db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                req.status = "loggedOut";
                req.user = null;
                return next();
            }
            if (!result.length) {
                console.log("No user found with this ID.");
                req.status = "loggedOut";
                req.user = null;
                return next();
            }
            req.status = "loggedIn";
            req.user = result[0];
            console.log("User logged in:", req.user);
            return next();
        });
    } catch (err) {
        req.status = "loggedOut";
        req.user = null;
        console.log("JWT verification failed. Status set to:", req.status);
        return next();
    }
};

module.exports = loggedIn;
