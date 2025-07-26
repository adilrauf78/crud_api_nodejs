const mysql = require('mysql2/promise');

const mysqlpool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'students_db',
})
module.exports = mysqlpool;
