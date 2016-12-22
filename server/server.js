// Node Modules
const http = require('http');
const path = require('path');
// Third Party Modules
const express = require('express');
const socketIO = require('socket.io');

// App specific constants
const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('Connected to User');

	socket.on('createMessage', (newMessage) => {
		console.log('createEmail', newMessage);

		newMessage.createdAt = new Date();

		socket.emit('newMessage', newMessage);
	});

	socket.on('disconnect', () => {
		console.log('Disconnected from Client');
	});
	
});



server.listen(port, () => {
	console.log(`App is running on port ${port}`);
});
