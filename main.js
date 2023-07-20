require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const dbConnect = require('./config/db');
const router = require('./router/routes');

const app = express();
const PORT = process.env.PORT || 5055;

dbConnect();

//middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(session({
    secret : "My secret key",
    saveUninitialized : true,
    resave :false,
}));

app.use((req,res,next) =>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use(express.static('uploads'));

// set template engine 
app.set("view engine", "ejs");

// route prefix
app.use("",router);

app.listen(PORT,()=>{
    console.log(`App is running on http://localhost:${PORT}`);
})