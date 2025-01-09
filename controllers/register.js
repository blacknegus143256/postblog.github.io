const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");
module.exports = (req, res) => {
    // Registration logic
    res.send("Registered successfully!");
};
const register = async (req, res) => {
    const {uname, username, password : Npassword } = req.body
        if( !username || !Npassword) return res.json ({status : "error" , error : "Please Enter your Username and Password"});
            else {
                console.log(username);
                     db.query('SELECT username FROM users WHERE username = ?' , [username], async (err, result) => {
                            if(err) throw err;
                            if(result [0])return res.json({status : "error" , error : "User is already Registered"})
                             else{
                            
                            const password = await bcrypt.hash(Npassword, 8);
                            console.log(password);
                            db.query('INSERT INTO users SET ?' , {uname:uname, username:username , password:password}, (error, results) => {
                            if (error)throw error;
                            return res.json({status : "success" , error : "User has been Registered"})
                            }
)}
    })
}
}
module.exports = register;
