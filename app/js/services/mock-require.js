angular.module('pbUi.mockRequire', [])
  .factory('MockRequire', [function () {
    'use strict';

    /**
     * Mocking require function so that we are fully able to work with
     * this without having to build our application. Whenever we want
     * to include new things to be mocked we add them here and deal
     * with it through the switch.
     */
    var _require = function (moduleName) {
      switch (moduleName){
        case 'serialport':
          return {
            list : function (cb) {
              var mockedPorts = [
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

              setTimeout(function () {
                cb(null, mockedPorts);
              }, 300);
            }
          };
      }
    };

    return {
      require: _require
    };
  }]);
