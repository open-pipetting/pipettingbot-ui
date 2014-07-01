angular.module('pbUi.machineService', [])
  .factory('MachineService', [function () {
    var defaultParams = [
      {
        name: 'Altura Total',
        token: 'total-height',
        value: 2000
      },
      {
        name: 'Largura Total',
        token: 'total-width',
        value: 1000
      }
    ];

    var model = angular.fromJson(localStorage.machineParams) || defaultParams;


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


    var service = {
      model: model,

      GenMoveCode: genMoveCode,

      SaveState: function () {
        localStorage.machineParams = angular.toJson(service.model);
      },

      RestoreState: function () {
        service.model = angular.fromJson(localStorage.machineParams);
      }
    };

    return service;
  }]);
