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
      var code = '';

      if($scope.isCalibrating) {
        code = $scope.machine.GenMoveCode(dir);
        if (code)
          $scope.currentMachine.write(code + '\n');
      }
    };
  }]);
