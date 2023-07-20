const mongoose = require('mongoose');

const DB_URL = "mongodb://localhost:27017/ejs_db";

const dbConnect = () =>{
    mongoose
    .connect(DB_URL)
    .then((conn) =>{
        console.log(`connected to DB : ${conn.connection.host}`)
    })
    .catch((err) => console.log(err.message))
}

module.exports = dbConnect;