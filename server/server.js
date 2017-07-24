const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('new user connected');

    // Send to the new user only when a connection is made
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));

    // send to everyone else
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

    // listens for the createMessage event from client and then sends it out to everyone
    socket.on('createMessage', (message) =>{
         console.log('just got a message:', message);
        io.emit('newMessage', generateMessage(message.from,message.text));
     });

        // listens for a disconnnect from client
        socket.on('disconnect',()=>{
            console.log('Disconnected from client');
        })
});


server.listen(port, ()=>{
console.log(`Server is up on ${port}`);
});