angular.module('pbUi.openPorts', [])
  .factory('OpenPorts', ['$q', function ($q) {
    'use strict';

    var spm = require('serialport-manager')
      , split = require('split');

    if (!$q)
      var $q = require('q');

    /**
     * Represents the conjunction of machines that we might have to search
     */
    function Machines () {}

    Machines.prototype.search = function (onValidDeviceFound) {
      var scope = this;

      spm(function (err, manager) {
        if (err) throw err;

        manager.on('device', function (device) {
          if (scope.isValidDevice(device))
            onValidDeviceFound(device);
        });
      });
    };

    Machines.prototype.isValidDevice = function (device) {
      if (!device.info ||
          !~device.info.signature.toLowerCase().indexOf('grbl'))
        return false;
      return true;
    };

    /**
     * Represents a device.
     * @param {function} dFun callback function for disconnect event
     */
    function Device (device, dFun) {
      this.device = device;
      this.stream = null;
      this.dFun = dFun;
    }

    Device.prototype.connect = function (onData) {
      var dfd = $q.defer();
      var scope = this;

      this.device.connect(function (err, stream) {
        if (err) dfd.reject(err);

        stream.setEncoding('utf8');
        stream.on('end', function () {
          dFun('disconnected');
        });

        scope.stream = stream;
        dfd.resolve(scope);
      });

      return dfd.promise;
    };

    Device.prototype.write = function (data) {
      this.stream.write(data);
    };

    Device.prototype.registerToData = function(fn) {
      this.stream.pipe(split()).on('data', function (d) {
        fn(d);
      });
    };

    var machines = new Machines();
    var currDevice;
    var searchInterval;

    function searchDevice () {
      var searchFun = function () {
        console.log('searching...');

        machines.search(function (device) {
          currDevice = new Device(device);
          currDevice.connect().then(function () {

            clearInterval(searchInterval);
            setInterval(function () {
              currDevice.write('?\n');
            }, 300);

            currDevice.registerToData(function (d) {
              console.log(d);
            });

          }, function (err) {
            console.error(err);
          });
        });
      };

      searchFun();
      searchInterval = setInterval(searchFun, 6000);
    }

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
      searchDevice: searchDevice
    };
  }]);
