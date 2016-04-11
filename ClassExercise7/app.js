var express = require('express'),
    app = express(),
    http = new require('http').Server(app),
    socket = require('socket.io'),
    io = socket('http');

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log("client Connected")
});

http.listen(8080, () => console.log("Listening on port 8080.."));
