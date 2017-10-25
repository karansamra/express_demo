// MySQL connection.
var mysql = require('mysql');

var con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'express_demo'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("MySQL DB Connected!");
});

module.exports = con;