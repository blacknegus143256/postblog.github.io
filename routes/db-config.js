const sql = require("mysql");
const dotenv = require("dotenv").config();

// Check if environment variables are loaded
console.log("Database Host:", process.env.DATABASE_HOST);
console.log("Database User:", process.env.DATABASE_USER);

const db = sql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

module.exports = db;