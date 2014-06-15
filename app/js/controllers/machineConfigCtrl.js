angular.module('pbUi.machineConfigCtrl', [])
  .controller('machineConfigCtrl', ['$scope', function($scope) {

  	$scope.showHelp = false;
  	$scope.isCalibrating = false;

  	function _keyListener (e) {
  		console.log(e);
  	}

  	$scope.toggleCalibration = function () {
  		$scope.isCalibrating = !$scope.isCalibrating;

  		if ($scope.isCalibrating) {
	  		$('body').bind('keypress', _keyListener);
  		} else {
				$('body').unbind('keypress', _keyListener);
  		}
  	};

  }]);
