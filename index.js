const express = require("express");
const db = require("./routes/db-config");
const app = express();
const loggedIn = require("./controllers/loggedIn");
const postRoutes = require("./controllers/postRoutes");
const path = require('path');
const cookieParser = require("cookie-parser");

app.use("/js", express.static(__dirname + "/public/js"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cookieParser());
app.use(express.json());

// Connect to database
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1); // Exit the app if the DB fails to connect
    }
});

// Middleware and routes
app.use(loggedIn);
app.get("/", (req, res) => {
    res.render("index", { status: req.status, user: req.user });
});
app.get("/profile", (req, res) => {
    res.render("profile", { status: req.status, user: req.user });
});
app.use("/api/posts", postRoutes);
app.use("/", require("./routes/pages"));
app.use("/api", require("./controllers/auth"));

// Export the app for Vercel
module.exports = app;
