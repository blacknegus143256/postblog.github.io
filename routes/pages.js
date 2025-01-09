const express = require ("express");
const loggedIn = require("../controllers/auth");
const logout = require("../controllers/logout");
const router = express.Router();

router.get("/" , loggedIn, (req, res) => {
    console.log("User in route handler:", req.user); 
    console.log("Status in route handler:", req.status);  // Confirm `status` is defined
    res.render('index', { status: req.status || "loggedOut" , user: req.user});
})
router.get("/register" , (req, res) => {
    res.sendFile("register.html", {root: "./public"});
})
router.get("/login" , (req, res) => {
    res.sendFile("login.html" , {root: "./public/"});
})
router.get("/logout", logout);
module.exports = router;
