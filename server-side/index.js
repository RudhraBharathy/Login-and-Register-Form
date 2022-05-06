const express = require('express');
const {createPool} = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();


app.use(cors());
app.use(bodyParser.json());

const db = createPool({
    host: "localhost",
    user:"root",
    password:"12345",
    database:"user_login_register_details",
    connectionLimit:10
});


const port = process.env.PORT || 3001;
app.listen(port, () => console.log("Server Listening on port: " + port));


app.post('/register',(req,res) => {
    const email =req.body.email;
    db.query("SELECT * FROM userregisterdetails WHERE email = ?",
    [email],(err,result) => {
        if (err){
            res.send({err: err})
        }
        if(result.length > 0){
            res.send({message:"This Email is already Taken!! Try another"}); 
        }
        else{
            res.send({ noDuplex : true});
        }
    });
}); 


app.post('/register/userdata',async (req, res)=>{
    
    const {username, email} = req.body;
    let {password, confirmpassword} = req.body;
    let hashedPassword = "";
    let hashedConfirmPassword = "";
    

    await bcrypt.genSalt(12).then(salt => {
        bcrypt.hash(req.body.password,salt).then(hash => {
            hashedPassword = hash;
            bcrypt.hash(req.body.confirmpassword,salt).then(hash => {
                hashedConfirmPassword = hash;
                confirmpassword = hashedConfirmPassword;
                password = hashedPassword;
                db.query(
                    "INSERT INTO userregisterdetails (username,email,password,confirmpassword) VALUES (?, ? ,?, ?)",
                    [username,email,password,confirmpassword],
                    (err, result)=>{
                        console.log(err);
                    }
                )
            })
        });
    })
});



app.post('/login',async (req, res) => {
    const {email,password} = req.body; 
    let fetchedDbEmail = "";
    let fetchedDbPassword = "";

    db.query(
        "SELECT email, password FROM userregisterdetails WHERE email = ?",[email],
        (err, result)=>{
            if(err) {
                res.send({err : err});
            }

            if(result.length > 0) {            
                fetchedDbEmail = result[0].email; 
                fetchedDbPassword = result[0].password;
                if(bcrypt.compareSync(password,fetchedDbPassword)){
                    res.send({message : "Success"});
                }
                else{
                    res.send({incorrectAuthValues : "Incorrect username or password"});
                }
            }   
        }
    );

});


app.post('/login/userdata',async (req, res) => {
    const {email} = req.body; 
    const dateandTime = new Date();
    const date = dateandTime.toDateString();
    const time = dateandTime.toLocaleTimeString();
    db.query(
        "SELECT username FROM userregisterdetails WHERE email = ?",[email],
        (err, result)=>{
            if(result.length > 0){
                let username = result[0].username;
                db.query(
                    "INSERT INTO user_login_register_details.login_details (username,date,time) VALUES (?, ?, ?)",[username,date,time],
                    (err, result)=>{
                        res.send({message:"Success"});
                    }
                );
            }
        }
    )
});




