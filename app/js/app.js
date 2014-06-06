'use strict';

angular.module('pbUi', [
  'ngRoute',
  'pbUi.filters',
  'pbUi.services',
  'pbUi.directives',
  'pbUi.mainCtrl',
  'pbUi.homeCtrl',
  'pbUi.fileInsertCtrl'
]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'homeCtrl'
      })
      .when('/file-insert', {
        templateUrl: 'partials/file-insert.html',
        controller: 'fileInsertCtrl'
      })
      .otherwise({redirectTo: '/'});
  }]);
