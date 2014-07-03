angular.module('pbUi.homeCtrl', [])
  .controller('homeCtrl',
              ['$scope', '$q', 'OpenPorts',
              function($scope, $q, OpenPorts) {
    'use strict';

  	$scope.ports = [];

    $scope.searchDevice = function () {
      OpenPorts.searchDevice();
    };

  	$scope.getPorts = function () {
  		OpenPorts.getDevice().then(function (device) {
  			$scope.ports = [device];
  		}, function (err) {
  			console.error(err);
  		});
  	};

  }]);
