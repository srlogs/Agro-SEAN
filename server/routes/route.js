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


//  Get seller data list 
router.post('/seller/data', (req,res, next) => {
    var sql = "SELECT * FROM sellerdata WHERE email = ?";
    var values = [
        [req.body.email]
    ];
    con.query(sql, [values], (err, result) => {
        if(err) throw result;
        res.send(result);
    })
})

//  Get personal information
router.post('/user/personaldata', (req, res, next) => {
    var sql = "SELECT * FROM personaldata WHERE email = ?";
    var values = [
        [req.body.email]
    ];
    con.query(sql, [values], (err, result) =>{
        res.send(result);
    })
})

//  Get specific product 
router.post('/fruit/name', (req, res, next) => {
    con.query("SELECT * FROM productlist WHERE productname = ?", [req.body.productname], (err, result) => {
        if(err) throw err;
        res.send(result);
    })
})
//  Getting fruits data 
router.get('/fruits', (req, res, next) => {
    con.query("SELECT * FROM productlist WHERE category = 'fruit'", (err, result) => {
        if(err) throw err;
        res.send(result);
    } )
   
})

//  Getting vegetables data 
router.get('/vegetables', (req, res, next) => {
    con.query("SELECT * FROM productlist WHERE category = 'vegetable'", (err, result) => {
        if(err) throw err;
        res.send(result);
    } )
   
})

//  View product data
router.get('/products', authenticate, (req, res, next) => {
    con.query("SELECT * FROM productlist", (err, result) => {
        if(err) throw err;
        res.send(result);
    })
})

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
        if(result.length > 0) {
            const email = req.body.email;
            const user = { emailid : email };
            const accessToken = jwt.sign(user, process.env.TOKEN_SECRET);
            bcrypt.compare(req.body.password, result[0].password, function(err, isMatch) {
                if(err) 
                    throw err;
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

//  Adding personal information
router.post('/user/personalinfo', (req, res, next) => {
    con.query("CREATE TABLE IF NOT EXISTS personaldata(email VARCHAR(100), mobile VARCHAR(20), doorno VARCHAR(50), street VARCHAR(50), district VARCHAR(50))", (err, result) => {
        if(err) throw err;
    });
    var sql = "INSERT INTO personaldata (email, mobile, doorno, street, district) VALUES ?";
    let value = [
        [req.body.email, req.body.mobile, req.body.doorno, req.body.street, req.body.district]
    ];
    con.query(sql, [value], (err, result) => {
        if(err) throw err;
        console.log("info inserted");
    })
    res.json({status : 200});
})

//  Get count of seller products 
router.post('/seller/count', (req, res, next) => {
    var sql = "SELECT COUNT(productname) as productCount, productname FROM sellerdata WHERE productname = ?";
    var values = [req.body.productname];
    con.query(sql, values, (err, result) => {
        if(err) throw err;
        res.json(result);
    })
})

//  Adding cart data 
router.post('/user/cartdata', (req, res, next) => {
    var sql = "CREATE TABLE IF NOT EXISTS cartdata(email VARCHAR(50), productname VARCHAR(50), location VARCHAR(20), category VARCHAR(50), time VARCHAR(50))";
    con.query(sql, (err, result) => {
        if(err) throw err;
    
    sql = "INSERT INTO cartdata(email, productname, location, category, time) VALUES ?";
    var values = [
        [req.body.email, req.body.productname, req.body.location, req.body.category, req.body.time]
    ];
    con.query(sql, [values], (err, result) => {
        if(err) throw err;
        res.json({status : "success"});
    })
    
    })
})

//  Get count of product in cart data
router.post('/user/cartdata/count', (req, res, next) => {
    var sql = "CREATE TABLE IF NOT EXISTS cartdata(email VARCHAR(50), productname VARCHAR(50), location VARCHAR(20), category VARCHAR(50), time VARCHAR(50))";
    con.query(sql, (err, result) => {
        if(err) throw err;
    })
    var sql= "SELECT COUNT(*) AS productcount WHERE productname = ?";
    var values = [
        req.body.productname
    ]
    con.query(sql, values, (err, result) => {
        if(err) throw err;
        res.send(result);
    })
})

//  Get cart data 
router.post('/user/getcart/', (req, res, next) => {
    var sql = "SELECT DISTINCT email, productname, location, category, time FROM cartdata WHERE email = ?";
    var values = [
        req.body.email
    ];
    con.query(sql, values, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    })
})

//  update personal info
router.post('/user/personalinfo/update', (req, res, next) => {
    var sql = "UPDATE personaldata SET mobile = ?, doorno = ?, street = ?, district = ? WHERE email = ?";
    var values = [
        req.body.mobile, req.body.doorno, req.body.street, req.body.district, req.body.email
    ];
    con.query(sql, values, (err, result) => {
        if(err) throw err;
        res.json({status : 200});
    })
})

//  Adding seller list
router.post('/user/seller', (req, res, next) => {
    con.query("CREATE TABLE IF NOT EXISTS sellerdata(email VARCHAR(100), productname VARCHAR(50), location VARCHAR(50), category VARCHAR(50), quantity VARCHAR(20), price VARCHAR(50), latitude VARCHAR(100), longitude VARCHAR(100))", (err, result) => {
        if(err) throw err;
    });
    var sql = "INSERT INTO sellerdata (email, productname, location, category, quantity, price, latitude, longitude) VALUES ?";
    let value = [
        [req.body.email, req.body.productName, req.body.location, req.body.category, req.body.quantity, req.body.price, req.body.latitude, req.body.longitude]
    ];
    con.query(sql, [value], (err, result) => {
        if(err) throw err;
        console.log("seller data inserted");
    })
    res.json({status : 200});
})

module.exports = router;
