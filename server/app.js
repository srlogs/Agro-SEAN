const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const route = require('./routes/route');
app.use(cors());
app.use(bodyparser.json());
app.use('/api', route);



app.listen(port, () => {
    console.log("server is up");
});


