const express = require("express");
const db = require("./routes/db-config");
const app =express();
const loggedIn = require("./controllers/loggedIn");
const postRoutes = require("./controllers/postRoutes");
const path = require('path');
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;
app.use("/js", express.static(__dirname + "/public/js"))
app.use("/css", express.static(__dirname + "/public/css"))
app.set("view engine", "ejs");
app.set("views", "./views");
app.set("views", __dirname + "/views");
app.use(cookieParser());
app.use(express.json());
db.connect((err) => {
    if (err) throw err;
})
// app.get('/', (req, res) => {
//     res.render('index', req.query);
//    });
app.use(loggedIn);
app.get("/", (req, res) => {
    res.render("index", { status: req.status, user: req.user });
});
// index.js
app.get("/profile", (req, res) => {
    res.render("profile", { status: req.status, user: req.user });
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/posts", require("./controllers/postRoutes"));
app.use("/api/posts", postRoutes);
app.use("/", require("./routes/pages"));
app.use("/api", require("./controllers/auth") );
app.listen(PORT);