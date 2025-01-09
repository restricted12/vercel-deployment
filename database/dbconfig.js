// dbconnection.js
const mysql2 = require('mysql2/promise');

const dbconnection = mysql2.createPool({
    host: 'localhost',
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    connectionLimit: 10, // Optional
});

module.exports = dbconnection;


