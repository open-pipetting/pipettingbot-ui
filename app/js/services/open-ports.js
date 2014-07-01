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


// function getGrblDevice (timer, onGrblDeviceResolved) {
//   var split = require('split');
//   var spm = require('serialport-manager');

//   spm(function (err, manager) {
//     if (err) throw err;

//     manager.on('device', function (device) {
//       if (!device.info ||
//           !~device.info.signature.toLowerCase().indexOf('grbl'))
//         return;

//       onGrblDeviceResolved(device);

      // var statusTimer = setInterval(function () {
      //   stream.write('?');
      // }, 500);

      // stream.setEncoding('utf8');
      // stream.pipe(split()).on('data', function (d) {
      //   console.log(d);
      // });

      // stream.on('end', function () {
      //   console.log("disconnected");
      //   clearInterval(statusTimer);
      // });
//     });
//   });
// }

// function Device (device, dFun) {
//   this.device = device;
//   this.stream = null;
//   this.dFun = dFun;
// }

// Device.prototype.connect = function () {
//   var dfd = $q.defer();

//   device.connect(function (err, stream) {
//     if (err) dfd.reject(err);

//     stream.setEncoding('utf8');

//     stream.on('end', function () {
//       dFun('disconnected');
//     });
//     this.stream = stream;
//     dfd.resolve(this);
//   });

//   return dfd.promise;
// };

// Device.prototype.registerToData = function (fn) {
//   stream.pipe(split()).on('data', function (d) {
//     fn(d);
//   });
// };

// Device.prototype.write = function (data) {
//   if (!this.writable)
//     return false;

//   this.stream.write(data);
// };

