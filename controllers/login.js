const jwt = require("jsonwebtoken");
const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");
module.exports = (req, res) => {
    // Registration logic
    res.send("Registered successfully!");
};
const login = async (req, res) => {
    const { username, password } = req.body;
    if( !username || !password) return res.json ({status : "error" , error : "Please Enter your Username and Password"});
    else {
        db.query('SELECT * FROM users WHERE username =?' , [username], async (err, result) => {
            if(err) throw err;
            if (!result.length || !await bcrypt.compare(password, result[0] . password)) return res.json({status : "error" , error : "Incorrect Username OR Password"})
                else{
                    const token = jwt.sign({id : result[0].id }, process.env.JWT_SECRET, {
                        expiresIn:process.env.JWT_EXPIRES,
                    })
                    const cookieOptions = {
                        expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly:true
                    }
                    res.cookie("userRegistered" , token, cookieOptions);
                    return res.json({status: "success" , success: "User has successfully Logged IN", redirect: "/" });
                }
        })
    }
}

module.exports = login;
