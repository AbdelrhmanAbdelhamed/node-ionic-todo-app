var express = require('express');
var http = require('http');
var bodyparser = require('body-parser');
var cors = require('cors');
var connection = require('./config/connection');
var routes = require('./app/routes');


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyparser.urlencoded({
	extended: false
}));
app.use(bodyparser.json());
app.use(express.static(__dirname + '/app/public'));
app.use(new cors());


io.on('connection', function(socket) {

//	console.log(socket.id);

	socket.on('addToDo', function (data) {
		io.emit('newToDo', data);
	});

	socket.on('removeToDo', function (data) {
		io.emit('deleteToDo', data);
	});

	socket.on('setIsDone', function (data) {
		io.emit('updateToDo', data);
	});

});


connection.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
});

routes.configure(app);

http.listen(8000, function () {
	console.log('listening on *:8000');
});