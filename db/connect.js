require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: process.env.DB_NAME
});

connection.connect((err)=>{
    if(err){
        console.log(err.message);
    }else{
        console.log("Connected Successfully");
    }
})

module.exports = connection;