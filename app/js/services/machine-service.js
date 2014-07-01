angular.module('pbUi.machineService', [])
  .factory('MachineService', [function () {

    var service = {
        model: [
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
      ],

      SaveState: function () {
        localStorage.machineParams = angular.toJson(service.model);
      },

      RestoreState: function () {
        service.model = angular.fromJson(localStorage.machineParams);
      }
    };

    return service;
  }]);
