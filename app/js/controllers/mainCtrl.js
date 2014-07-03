angular.module('pbUi.mainCtrl', [])
  .controller('mainCtrl',
              ['$scope', 'SystemService',
              function($scope, SystemService) {

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
    }

    $scope.setSectionAsActive = function (index, event) {
      if (!$scope.sections[index].allowed) {
        event.preventDefault();

        return;
      }

      for (var i in $scope.sections) {
        var sec = $scope.sections[i];

        if (sec.active) sec.active = false;
      }

      $scope.sections[index].active = true;
    };

    $scope.isActive = function (section) {
      return section.active;
    }

    $scope.setCurrentMachine = function (port) {
      if ($scope.currentMachine && $scope.currentMachine !== port)
        $scope.currentMachine.selected = false;

      port.selected = !port.selected;
      if (!port.selected) {
        $scope.currentMachine = {};
      } else {
        $scope.currentMachine = port;
      }
    };

    $scope.$watch('currentMachine', function (newValue, oldValue) {
      if (newValue) {
        $scope.sections[1].allowed = true;
        $scope.sections[3].allowed = true;
      } else {
        $scope.sections[1].allowed = false;
        $scope.sections[3].allowed = false;
      }
    });
  }]);
