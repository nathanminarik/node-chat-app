var socket = io();

socket.on('connect', function () {
	console.log('Connected to Server')

});

socket.on('newMessage', function (message) {
	console.log('New Message', message);
});

socket.on('disconnect', function () {
	console.log('Disconnected From Server');
});


// socket.emit('createMessage', {
// 	from: 'User A',
// 	text: 'Hello, friend.'
// });