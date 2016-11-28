var UserController = require('./../controllers/users');
var EventController = require('./../controllers/events');
var path = require('path');

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname, '../../client/index.html'));
	});

	app.get('/allusers', UserController.index);

	app.get('/login/:id', UserController.login);
	app.get('/users/:id', UserController.find);
	app.post('/users', UserController.create);
	app.get('/findAllExcept/:id', UserController.findAllExcept);
	app.get('/findUserByName/:name', UserController.findUserByName);
	app.get('/findPendingEvents/:id', UserController.findPendingEvents);
	app.get('/findCompletedEvents/:id', UserController.findCompletedEvents);
	app.put('/users/:id', UserController.update);

	app.post('/events', EventController.create);
	app.put('/events/:id', EventController.update);
};