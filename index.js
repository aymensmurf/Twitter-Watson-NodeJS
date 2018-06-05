const Twit = require('twit');
const config = require('./config');

const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

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
    
    socket.on('getMyTweets', function(data){
        
    });
})

server.listen(port, () => {
    console.log(`Magic happens on ${port}`);
});

