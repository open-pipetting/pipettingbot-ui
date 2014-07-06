angular.module('pbUi.mainCtrl', [])
  .controller('mainCtrl',
              ['$scope', 'SystemService', 'OpenPorts',
              function($scope, SystemService, OpenPorts) {

    $scope.currentMachine = {};

    /**
     * Keeps track of the sections that are allowed to be navigated into
     */
    $scope.sections = [
      { ref: 'home',
        name: 'Home',
        allowed: true,
        active: true },
      { ref: 'file-insert',
        name: 'Inserção de Arquivo',
        allowed: false,
        active: false },
      { ref: 'edit',
        name: 'Edição',
        allowed: false,
        active: false },
      { ref: 'machine-config',
        name: 'Conf. Máquina',
        allowed: false,
        active: false },
      { ref: 'about',
        name: 'Sobre',
        allowed: true,
        active: false },
      { ref: 'exit',
        name: 'Sair',
        allowed: true,
        active: false }
    ];

    /**
     * Constrols de GUI.
     */
    $scope.gui = function (w) {
      switch (w) {
        case 'min':
        SystemService.minimize();
        break;

        case 'max':
        SystemService.maximize();
        break;

        case 'close':
        SystemService.close();
        break;
      }
    };

    $scope.setSectionAsActive = function (index, event) {
      if (!$scope.sections[index].allowed) {
        event.preventDefault();

        return;
      }

      for (var i in $scope.sections)
        if ($scope.sections[i].active)
          $scope.sections[i].active = false;

      $scope.sections[index].active = true;
    };

    $scope.setCurrentMachine = function (port) {
      if ($scope.currentMachine && $scope.currentMachine !== port)
        $scope.currentMachine.selected = false;

      port.selected = !port.selected;
      if (!port.selected)
        $scope.currentMachine = {};
      else
        $scope.currentMachine = port;
    };

    $scope.$watch('currentMachine', function (newValue, oldValue) {
      if (Object.keys(newValue).length) {
        $scope.sections[1].allowed = true;
        $scope.sections[3].allowed = true;
      } else {
        $scope.sections[1].allowed = false;
        $scope.sections[3].allowed = false;
      }
    });


    $scope.getDevice = function () {
      OpenPorts.getDevice().then(function (device) {
        $scope.ports = [device];
      }, function (err) {
        console.error(err);
      });
    };

    $scope.getDevice();

  }]);
