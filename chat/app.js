var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    socket = require('socket.io'),
    io = socket(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log("A user connected");
  socket.on('disconnect', () => console.log("A user disconnected"));
  socket.on('chat message', (msg) => {
    console.log('A user said', msg);
    io.emit('chat message', msg);
  })
});

http.listen(80, () => console.log("listening on port 80..."));
