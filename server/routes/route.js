require('dotenv').config()
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const config = require('../config.js');
const jwt = require('jsonwebtoken');
const router = express.Router();
const saltRounds = 10;

//  database connection
var con = mysql.createConnection(config);
con.connect(function(err) {
    if(err) {
        throw err;
    }
    console.log("mysql is connected");
    con.query("CREATE DATABASE IF NOT EXISTS users", (err, result) => {
        if(err) throw err;
        // console.log("Database created");
    })
});

//  View data
router.get('/auth', authenticate, (req, res, next) => {
    con.query("SELECT * FROM userdata WHERE email = ?", [req.user.emailid], (err, result) => {
        if(err) throw err;
        res.send(result);
    })  
});

//  Authenticate function 
function authenticate(req, res, next) {
    const authHeader = req.headers['token'];
    const token = authHeader && authHeader.split(' ')[0];
    if(token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
        if(err) throw err;
        req.user = data;
        //console.log("email is ", req.user.emailid);
        next();
    })
}


//  Authenticate data
router.post('/user/authenticate', (req, res, next) => {
    console.log(req.body.email);
    con.query("SELECT email, password FROM userdata WHERE email = ?", [req.body.email], (err, result) => {
        if(err) throw err;
        console.log(result);
        if(result.length > 0) {
            const email = req.body.email;
            const user = { emailid : email };
            const accessToken = jwt.sign(user, process.env.TOKEN_SECRET);
            bcrypt.compare(req.body.password, result[0].password, function(err, isMatch) {
                if(err) 
                    throw err;
                console.log(isMatch);
                if(isMatch) {
                    res.json({accesstoken : accessToken, status : 200 });
                } 
                else {
                    res.json({ status : 400 });
                }
            });
        }
        else {
            res.json({ status : 400 });
        }
    })
    
    
})

//  Register data
router.post('/user/register', (req, res, next) => {
    con.query("CREATE TABLE IF NOT EXISTS userdata(username VARCHAR(50), email VARCHAR(50), password VARCHAR(250))", (err, result) => {
        if(err) throw err;
        console.log("table is created");
    });
    // Hasing password
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) { 
        var sql = "INSERT INTO userdata (username, email, password) VALUES ?";
        let value = [
            [req.body.username, req.body.email, hash]
        ];
        con.query(sql, [value], (err, result) => {
            if(err) throw err;
            console.log("record is inserted");
        })
    })
    res.sendStatus(200);
})

module.exports = router;
