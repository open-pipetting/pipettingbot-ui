angular.module('pbUi.openPorts', [])
  .factory('OpenPorts', ['$q', function ($q) {
    'use strict';
    var yaspm = require('yaspm')
      , machines = new yaspm.Machines();

    /**
     * Gets a compatible device from the connected stuff
     * @param  {Function} dcb callback to be resolved when the
     *                        disconnect event is fired.
     * @return {promise}     the promise to be resolved with the
     *                        device or rejected with err.
     */
    function _getDevice (dcb) {
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


    return {
      getDevice: _getDevice
    };
  }]);
