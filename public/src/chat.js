(function ($) {

	var socket = io();
	var locationButton = $('#send-location');

	function scrollToBottom () {
		// Selectors
		var messages = $('#messages');
		var newMessage = messages.children('li:last-child');
		// Heights
		var clientHeight = messages.prop('clientHeight');
		var scrollTop = messages.prop('scrollTop');
		var scrollHeight = messages.prop('scrollHeight');
		var newMessageHeight = newMessage.innerHeight();
		var lastMessageHeight = newMessage.prev().innerHeight();

		if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
			messages.animate({scrollTop:scrollHeight}, 1000);
			return false;
		}
	}



	socket.on('connect', function () {
		var params = $.deparam();
		socket.emit('join', params, function (err) {
			if (err) {
				alert(err);
				window.location.href = '/'
			} else {
				console.log('No error');
			}
		});
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
		scrollToBottom();

	});

	socket.on('updateUserList', function (users) {
		var ol = $('<ol></ol>')

		users.forEach(function (user) {
			ol.append($('<li></li>').text(user));
		});

		$('#users').html(ol);
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

		scrollToBottom();

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