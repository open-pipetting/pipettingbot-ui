'use strict';

angular.module('pbUi', [
  'ngRoute',
  'ui.bootstrap',
  'pbUi.filters',
  'pbUi.services',
  'pbUi.directives',
  'pbUi.mainCtrl',
  'pbUi.homeCtrl',
  'pbUi.fileInsertCtrl',
  'pbUi.machineConfigCtrl'
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
      .when('/machine-config', {
        templateUrl: 'partials/machine-config.html',
        controller: 'machineConfigCtrl'
      })
      .otherwise({redirectTo: '/'});
  }]);
