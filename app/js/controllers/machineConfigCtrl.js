angular.module('pbUi.machineConfigCtrl', [])
  .controller('machineConfigCtrl', [
              '$scope',
              'MachineService',
              function($scope, MachineService) {

    $scope.isCalibrating = false;
    $scope.currentMachineConfig;
    $scope.passos = 1;
    $scope.machine = MachineService;

    $scope.toggleCalibration = function () {
      $scope.isCalibrating = !$scope.isCalibrating;
    };

    $scope.onMove = function (dir) {
      if($scope.isCalibrating) {
        console.log($scope.machine.GenMoveCode(dir));
      }
    };
  }]);
