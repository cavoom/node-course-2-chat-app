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

    // Send to the new user only
    socket.emit('newMessage', {
        from: 'admin',
        text: 'Welcome here',
        createdAt: new Date().getTime()
    });

    // send to everyone else
    socket.broadcast.emit('newMessage', {
        from: 'admin',
        text: 'someone else joined yo',
        createdAt: new Date().getTime()
    });

    // listens for the createMessage event from client and then sends it out to everyone
    socket.on('createMessage', (message) =>{
         console.log('createMessage', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
     });
     // sends to everyone but the sender
    // socket.broadcast.emit('newMessage', {
    //     from: message.from,
    //     text: message.text,
    //     createdAt: new Date().getTime()
    // });
     })

        // listens for a disconnnect from client
        socket.on('disconnect',()=>{
            console.log('Disconnected from client');
        })
});


server.listen(port, ()=>{
console.log(`Server is up on ${port}`);
});