angular.module('pbUi.positionShower', [])
  .directive('pbPositionshower', [function () {
    'use strict';

    function startWebGL (canvasElem) {
      var gl = canvasElem.getContext("webgl") ||
               canvasElem.getContext("experimental-webgl");

      if (gl) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
      }

      return gl;
    }

    return {
      restrict: 'E',
      template: '<canvas width="578" height="200"></canvas>',
      link: function (scope, elems, attrs) {
        var canvas = elems[0].children[0];
        startWebGL(canvas);

      }
    };
  }]);
