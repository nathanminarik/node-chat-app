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

	socket.on('newLocationMessage', function (message) {
		var li = $('<li></li>');
		var a = $('<a target="_blank">My current location</a>');

		li.text(`${message.from}: `);
		a.attr('href', message.url);

		li.append(a);

		$('#messages').append(li);
	})

	$('#message-form').on('submit', function (e) {
		e.preventDefault();
		socket.emit('createMessage', {
			from: 'User',
			text: $('[name=message]').val()
		}, function (data) {
			console.log('This should work');
		});
	});

	var locationButton = $('#send-location');

	locationButton.on('click', function (e) {
		if(!navigator.geolocation) {
			return alert('Geolocation is not supported by your browser');
		}

		navigator.geolocation.getCurrentPosition(function(position) {
			socket.emit('createLocationMessage', {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			});
		}, function (error) {
			alert('Unable to fetch location');
		})
	});

})(jQuery)

// socket.emit('createMessage', {
// 	from: 'User A',
// 	text: 'Hello, friend.'
// });