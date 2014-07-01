angular.module('pbUi.homeCtrl', [])
  .controller('homeCtrl',
              ['$scope', '$q', 'OpenPorts',
              function($scope, $q, OpenPorts) {
    'use strict';

  	$scope.ports = [];

  	$scope.getPorts = function () {
  		OpenPorts.getPorts().then(function (ports) {
  			$scope.ports = ports;
  		}, function (err) {
  			console.error(err);
  		});
  	};

  }]);
