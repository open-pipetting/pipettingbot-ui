angular.module('pbUi.openPorts', [])
  .factory('OpenPorts', ['$q', function ($q) {
    'use strict';
    var yaspm = require('yaspm')
      , machines = new yaspm.Machines();

    function _getDevice () {
      var dfd = $q.defer();


      machines.search(function (err, device) {
        if (err) dfd.reject(err);

        device.connect(function () {
          device.registerToData(function (err, d) {
            if (err) console.error(err);
            if (d.match(/Idle/)) console.log(d);
          });

          dfd.resolve(device);
        });
      });

      return dfd.promise
    };

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
      getPorts: _getPorts,
      getDevice: _getDevice
    };
  }]);
