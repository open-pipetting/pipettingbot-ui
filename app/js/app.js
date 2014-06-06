'use strict';

// Declare app level module which depends on filters, and services
angular.module('pbUi', [
  'ngRoute',
  'pbUi.filters',
  'pbUi.services',
  'pbUi.directives',
  'pbUi.controllers'
]).
config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'homeCtrl'
		})
		.otherwise({redirectTo: '/'});
}]);
