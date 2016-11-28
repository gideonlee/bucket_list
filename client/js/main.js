var app = angular.module('App', ['ngRoute', 'ngFlash', 'ngCookies']);

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/_index.html',
		controller: 'IndexController',
	})
	.when('/dashboard', {
		templateUrl: 'partials/_dashboard.html',
		controller: 'DashboardController',
	})
	.when('/user/:id', {
		templateUrl: 'partials/_user.html',
		controller: 'UserController',
	})
	.when('/all', {
		templateUrl: 'partials/_showAll.html',
		controller: 'IndexController'
	})
});