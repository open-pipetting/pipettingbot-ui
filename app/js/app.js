'use strict';

angular.module('pbUi', [

  //external
  'ngRoute',
  'ui.bootstrap',

  //filters
  'pbUi.filters',

  //services
  'pbUi.machineService',
  'pbUi.mockRequire',
  'pbUi.openPorts',

  // directives
  'pbUi.dragXlsxFile',
  'cube-trans-vis',

  // controllers
  'pbUi.mainCtrl',
  'pbUi.aboutCtrl',
  'pbUi.homeCtrl',
  'pbUi.fileInsertCtrl',
  'pbUi.machineConfigCtrl'

]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/home', {
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
      .when('/about', {
        templateUrl: 'partials/about.html',
        controller: 'aboutCtrl'
      })
      .otherwise({redirectTo: '/home'});
  }]);
