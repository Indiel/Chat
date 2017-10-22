const app = require('express')();
const http = require('http').Server(app);

/* const fs = require('fs'); */
const io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('Пользователь подключился');
    socket.on('disconnect', function() {
        console.log('Пользователь отключился');
    });

    socket.on('message', function(msg) {
        console.log(msg);
        io.emit('new message', msg);
    });
});

http.listen(8000, function() {
    console.log('Сервер работает');
});