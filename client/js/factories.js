app.factory('UserFactory', ['$http', function($http) {
	var factory = {};

	factory.index = function() {
		return $http.get('/allusers');
	};

	factory.create = function(user) {
		return $http.post('/users', user);
	};

	factory.login = function(id) {
		return $http.get('/login/'+id);
	};

	factory.findAllExcept = function(id) {
		return $http.get('/findAllExcept/'+id);
	};

	factory.find = function(id) {
		return $http.get('/users/'+id);
	};

	factory.findUserByName = function(name) {
		return $http.get('/findUserByName/'+name);
	};

	factory.addEvent = function(event) {
		return $http.put('/users/'+event.user_id, event);
	};

	factory.findPendingEvents = function(id) {
		return $http.get('/findPendingEvents/'+id);
	};

	factory.findCompletedEvents = function(id) {
		return $http.get('/findCompletedEvents/'+id);
	};

	return factory;
}]);

app.factory('EventFactory', ['$http', function($http) {
	var factory = {};

	factory.create = function(event) {
		return $http.post('/events', event);
	};

	factory.update = function(event) {
		return $http.put('/events/'+event._id, event);
	};

	return factory;
}]);
