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

//custom modules
var { generateMessage } = require('./utils/message.js')


app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('Connected to User');

	// Send a welcome message when a user enters the chat room
	socket.emit('newMessage', generateMessage('Admin', 'Welcome New User'));

	// Added the boradcast message to all others in the connection when a new user joins
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has Joined'));

	socket.on('createMessage', (newMessage, callback) => {
		console.log('createEmail', newMessage);

		io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
		callback(`${2+2} This is from the server`);

	});

	socket.on('disconnect', () => {
		console.log('Disconnected from Client');

		socket.broadcast.emit('newMessage', generateMessage('Admin', 'User has left.'));
	});

});



server.listen(port, () => {
	console.log(`App is running on port ${port}`);
});
