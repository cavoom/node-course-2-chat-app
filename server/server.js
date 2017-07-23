const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('new user connected');

    socket.emit('newMessage', {
        from: 'david.haas@david.com',
        text: 'Hey, whats going on',
        createdAt: 'feb 12, 2018'
    });


    socket.on('createMessage', (newMessage)=>{
        console.log('createMessage', newMessage);
    })

        socket.on('disconnect',()=>{
            console.log('Disconnected from client');
        })
});


server.listen(port, ()=>{
console.log(`Server is up on ${port}`);
});