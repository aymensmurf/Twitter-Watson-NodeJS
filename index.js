var Twit = require('twit');
var express = require('express');
var app = require('express')();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000, () => console.log("Magic happens on localhost:3000"));

app.use(express.static(path.join(__dirname, 'public')));

var config = require('./config');

var T = new Twit(config);

io.sockets.on('connection', function (socket) {
    console.log("in socket");
    
    socket.on('keyWord', function (data) {
        
        var params = {
            q: data,
            //result_type: "popular",
            count: 100
        }
        
        T.get('search/tweets', params, searchedData);

        function searchedData(err, data, response) {
            socket.emit("dataFound", data);
            console.log(err);
        }
    });
})
