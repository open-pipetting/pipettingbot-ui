angular.module('pbUi.machineConfigCtrl', [])
  .controller('machineConfigCtrl', [
              '$scope',
              'MachineService',
              function($scope, MachineService) {

    $scope.isCalibrating = false;
    $scope.currentMachineConfig;
    $scope.passos = 1;
    $scope.machine = MachineService;

    var genMoveCode = (function GenMoveCode (start) {
      var counter = start || {x: 0, y: 0};

      return function (dir) {
        var moveCode = 'G10 ';

        switch (dir) {
          case '+x':
          return moveCode += 'X' + ++counter.x;

          case '-x':
          return moveCode += 'X' + --counter.x;

          case '+y':
          return moveCode += 'Y1' + ++counter.y;

          case '-y':
          return moveCode += 'Y' + --counter.y;

          default:
          return;
        }
      };
    })();

    $scope.toggleCalibration = function () {
      $scope.isCalibrating = !$scope.isCalibrating;
    };

    $scope.onMove = function (dir) {
      if($scope.isCalibrating) {
        console.log(genMoveCode(dir));
      }
    };

  }]);
