app.controller('IndexController', ['$scope', '$location', '$cookies', 'UserFactory', function($scope, $location, $cookies, UserFactory) {
	UserFactory.index().then(function(res) {
		$scope.all = res.data;
	});
	$scope.create = function() {
		UserFactory.create($scope.user).then(function(res) {
			$location.url('/dashboard');
			$cookies.put('user_id', res.data._id);
		}).catch(function(res) {
			console.log(res);
		});
	};
}]);

app.controller('DashboardController', ['$scope', '$location','$cookies', 'UserFactory', 'EventFactory', 'Flash', function($scope, $location, $cookies, UserFactory, EventFactory, Flash) {
	
	$scope.completed = function(event) {
		EventFactory.update(event).then(function(res) {
			// console.log(res);
		});
	};

	if ($cookies.get('user_id') !== undefined) {
		UserFactory.login($cookies.get('user_id')).then(function(res) {
			$scope.user = res.data;
		});
	} else {
		$location.url('/');
	}

	$scope.logout = function() {
		$location.url('/');
		$cookies.put('user_id', undefined);
	};

	$scope.addEvent = function() {
		if ($scope.event) {
			$scope.event.creatorId = $scope.user._id;
		}
		EventFactory.create($scope.event).then(function(res) {
			if ($scope.event.tagged) {
				var event = {
					event_id: res.data._id,
				};
				UserFactory.findUserByName($scope.event.tagged).then(function(res) {
					event.user_id = res.data._id; 
					UserFactory.addEvent(event).then(function(res) {
						console.log(res);
					});
				});
			}
			var event = {
				user_id: $scope.user._id,
				event_id: res.data._id
			};

			UserFactory.addEvent(event).then(function(res) {
				UserFactory.login($cookies.get('user_id')).then(function(res) {
					$scope.user = res.data;
				});
			});
			$scope.event = '';
		}).catch(function(res) {
			console.log(res);
		});
	};

	UserFactory.findAllExcept($cookies.get('user_id')).then(function(res) {
		$scope.otherUsers = res.data;
	});
}]);

app.controller('UserController', ['$scope', '$location', '$route', 'UserFactory', function($scope, $location, $route, UserFactory) {
	UserFactory.find($route.current.params.id).then(function(res) {
		$scope.user = res.data; 
	});

	$scope.logout = function() {
		$location.url('/');
		$cookies.put('user_id', undefined);
	};

	UserFactory.findCompletedEvents($route.current.params.id).then(function(res) {
		$scope.completed = res.data; 
	});

	UserFactory.findPendingEvents($route.current.params.id).then(function(res) {
		$scope.pending = res.data;
	});

}]);