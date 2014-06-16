angular.module('pbUi.openPorts', [])
  .factory('OpenPorts', ['$q', 'MockRequire', function ($q, MockRequire) {
    'use strict';

    var require = require || MockRequire.require;

    function _getPorts () {
      var serialPort = require("serialport")
        , dfd = $q.defer();

      serialPort.list(function (err, ports) {
        if (err) dfd.reject(err);

        dfd.resolve(ports);
      });

      return dfd.promise;
    }

    return {
      getPorts: _getPorts
    };
  }]);
