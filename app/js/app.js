'use strict';

angular.module('pbUi', [
  //external
  'ngRoute',
  'ui.bootstrap',

  //filters & services
  'pbUi.filters',
  'pbUi.services',

  // directives
  'pbUi.positionShower',
  'pbUi.dragXlsxFile',

  // controllers
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
