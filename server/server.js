// Node Modules
const http = require('http');
const path = require('path');
// Third Party Modules
const express = require('express');
const socketIO = require('socket.io');

//custom modules
var { generateMessage, generateLocationMessage } = require('./utils/message.js')
var { isRealString } = require('./utils/validation');
var { Users } = require('./utils/users');

// App specific constants
const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();


app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('Connected to User');

	// Check the users params to see if they have joined a room
	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Name and room must be a string');
		}

		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit('updateUserList', users.getUserList(params.room));

		// other socket events:

		// socket.leave('Room Name')
		// socket.emit -> socket.emit *** sends to one user
		// io.emit -> io.to('Room Name').emit sends to all users or all users in a room
		// socket.broadcast.emit -> socket.broadcast.to('Room Name').emit emits to all other users or all other users in a room

		// Send a welcome message when a user enters the chat room
		socket.emit('newMessage', generateMessage('Admin', 'Welcome New User'));

		// Added the boradcast message to all others in the connection when a new user joins
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));


		return callback();
	});

	socket.on('createMessage', (newMessage, callback) => {
		console.log('createEmail', newMessage);

		io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
		callback();


	});

	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});

	socket.on('disconnect', () => {
		console.log('Disconnected from Client');
		var user = users.removeUser(socket.id);

		if (user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
		}
	});

});



server.listen(port, () => {
	console.log(`App is running on port ${port}`);
});
