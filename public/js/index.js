var socket = io();
        socket.on('connect', function() {
            console.log('client connected to server');
        });

        socket.on('disconnect', function() {
            console.log('Disconnected from server');
        });

        socket.on('newMessage', function (message){
            console.log('new message received', message);

        })