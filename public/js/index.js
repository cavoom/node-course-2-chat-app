var socket = io();
        socket.on('connect', function() {
            console.log('client connected to server');

            socket.emit('createMessage', {
                to: 'everyone@somebody.com',
                text: 'hey heres the new message from the cliet'
            });
        });

        socket.on('disconnect', function() {
            console.log('Disconnected from server');
        });

        socket.on('newMessage', function (message){
            console.log('new message received', message);

            socket.emit('createMessage', message);
        })