angular.module('pbUi.homeCtrl', [])
  .controller('homeCtrl', ['$scope', function($scope) {
    $scope.ports = [
      {
        comName: 'dahora',
        manufacturer: 'dahudsh',
        pnpId: 'dahudsh',
        selected: false
      },
      {
        comName: 'dahora',
        manufacturer: 'dahudsh',
        pnpId: 'dahudsh',
        selected: false
      }
    ];
  }]);
