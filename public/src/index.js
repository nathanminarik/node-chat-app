(function ($) {

	var socket = io();

	socket.on('connect', function () {
		console.log('Connected to Server')
	});

	socket.on('newMessage', function (message) {
		console.log('New Message', message);
		var li = $('<li></li>');
		li.text('From: ' + message.from + ' | Message: ' + message.text);

		$('#messages').append(li);
	});

	socket.on('disconnect', function () {
		console.log('Disconnected From Server');
	});

	$('#message-form').on('submit', function (e) {
		e.preventDefault();
		socket.emit('createMessage', {
			from: 'User',
			text: $('[name=message]').val()
		}, function (data) {
			console.log('This should work');
		});
	});
})(jQuery)

// socket.emit('createMessage', {
// 	from: 'User A',
// 	text: 'Hello, friend.'
// });