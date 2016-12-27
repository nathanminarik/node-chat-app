(function ($) {

	var socket = io();
	var locationButton = $('#send-location');

	socket.on('connect', function () {
		console.log('Connected to Server')
	});

	socket.on('newMessage', function (message) {
		var formattedTime = moment(message.createdAt).format('h:mm a')
		var li = $('<li></li>');
		li.text('From: ' + message.from + ' @' + formattedTime + ' | Message: ' + message.text);
	
		$('#messages').append(li);
	});

	socket.on('disconnect', function () {
		console.log('Disconnected From Server');
	});

	socket.on('newLocationMessage', function (message) {
		var formattedTime = moment(message.createdAt).format('h:mm a')

		var li = $('<li></li>');
		var a = $('<a target="_blank">My current location</a>');

		li.text('From: ' + message.from + ' @' + formattedTime + ' ');
		a.attr('href', message.url);

		li.append(a);

		$('#messages').append(li);

		locationButton.text('Send Location').removeAttr('disabled');

	});

	$('#message-form').on('submit', function (e) {
		e.preventDefault();

		var messageTextBox = $('[name=message]')
		socket.emit('createMessage', {
			from: 'User',
			text: messageTextBox.val()
		}, function () {
			messageTextBox.val('');
		});
	});

	locationButton.on('click', function (e) {
		if(!navigator.geolocation) {
			return alert('Geolocation is not supported by your browser');
		}
		locationButton.attr('disabled', 'disabled').text('Sending Location...');

		navigator.geolocation.getCurrentPosition(function(position) {
			socket.emit('createLocationMessage', {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			});
		}, function (error) {
			alert('Unable to fetch location');
			locationButton.text('Send Location').removeAttr('disabled');
		})
	});

})(jQuery)

// socket.emit('createMessage', {
// 	from: 'User A',
// 	text: 'Hello, friend.'
// });