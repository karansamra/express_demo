var express = require('express');
var dbConnection = require('../dbConnection');
var socketApi = require('../socketApi');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {

    dbConnection.query('SELECT * from users', function (err, rows, fields) {
        if (err) throw err
        console.log(rows);

        for(var i in rows) {
            console.log(rows[i].firstname);
        }

        res.render('list-users', { title: 'List Users', usersData: rows});
    });
});

router.get('/socket-connection', function(req, res) {

    // socketApi.io.on('connection', function(client) {
    //     console.log('Client connected...');
    //
    //     client.on('join', function(data) {
    //         console.log(data);
    //         client.emit('messages', 'Hello from server from users page.');
    //     });
    // });

    socketApi.io.sockets.emit('messages', 'Hello from server from users page.');
    res.render('socket-test', { title: 'Socket Connection' });
});

router.get('/add', function(req, res) {
    res.render('add-user', { title: 'Add User' });
});

router.post('/save', function(req, res) {
    console.log(req.body);

    var sql = "INSERT " +
        "INTO users " +
        "(" +
        "firstname, " +
        "lastname," +
        "email_id," +
        "gender," +
        "age" +
        ") " +
        "VALUES " +
        "(" +
        "'"+req.body.firstname + "'," +
        "'"+req.body.lastname + "'," +
        "'"+req.body.emailId + "'," +
        req.body.gender + "," +
        req.body.age +
        ")";

    dbConnection.query(sql, function (err, result) {
        if (err) throw err
        console.log("1 record inserted");
        socketApi.io.sockets.emit('users', req.body);
        res.json(1);
    });
});

module.exports = router;