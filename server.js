const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {DATABASE_URL, PORT } = require('./config');

const app = express();
const jsonParser = bodyParser.json();

var path = require('path');
app.use(express.static('public'));

//routes
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



app.listen(PORT, () => {
    console.log("Server runing on port " + PORT);
});