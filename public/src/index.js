(function ($) {

	var socket = io();
	var locationButton = $('#send-location');

	socket.on('connect', function () {
		console.log('Connected to Server')
	});

	socket.on('newMessage', function (message) {
		
		var template = $('#message-template').html();
		var formattedTime = moment(message.createdAt).format('h:mm a')

		var html = Mustache.render(template, {
			text: message.text,
			createdAt: formattedTime,
			from: message.from
		});

		$('#messages').append(html);

		
		// var li = $('<li></li>');
		// li.text('From: ' + message.from + ' @' + formattedTime + ' | Message: ' + message.text);
	
		// $('#messages').append(li);
	});

	socket.on('disconnect', function () {
		console.log('Disconnected From Server');
	});

	socket.on('newLocationMessage', function (message) {
		var formattedTime = moment(message.createdAt).format('h:mm a')

		var template = $('#location-message-template').html();

		var html = Mustache.render(template, {
			from: message.from,
			createdAt: formattedTime,
			url: message.url
		});


		$('#messages').append(html);

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