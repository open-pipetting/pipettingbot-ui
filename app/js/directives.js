'use strict';

/* Directives */

angular.module('pbUi.directives', [])
  .directive('pbPositionshower', [function () {
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
  }])
  .directive('pbDragFile', ['$q', function ($q) {
    var $fileChooser = jQuery('#file-dialog')
        , Workbook = {}
        , files = [];

      Workbook._WB_toJSON = function (workbook) {
        var result = {}
          , roa = null;

        workbook.SheetNames.forEach(function(sheetName) {
          roa  = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

          if(roa.length > 0)
            result[sheetName] = roa;
        });

        return result;
      };

      Workbook._WB_toCSV = function (workbook) {
        var result = [];
        var csv = null;

        workbook.SheetNames.forEach(function(sheetName) {
          csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
          if (csv.length) {
            result.push("SHEET: " + sheetName);
            result.push("");
            result.push(csv);
          }
        });

        return result.join("\n");
      };

      Workbook.fileToWorkbook = function (f) {
        var reader = new FileReader()
          , name = f.name
          , dfd = $q.defer();

        if (!f.name.match(/\w+\.xlsx$/)) {
          dfd.reject(new Error('Filename does not match a valid one (something.xlsx)'));
        };

        reader.onload = function(event) {
          var data = event.target.result
            , workbook = null;

            try {
              workbook = XLSX.read(data, {type: 'binary'});
              dfd.resolve(workbook);
            } catch (err) {
              dfd.reject(err);
            }
        };
        reader.readAsBinaryString(f);

        return dfd.promise;
      };


    return {
      restrict: 'A',
      scope: true,
      link: function ($scope, $elem, $attrs) {

        function handleFile (file) {
          Workbook.fileToWorkbook(file).then(function (wb) {
            console.log(wb);
          }, function (err) {
            console.log(err);
          });
        }

        function handleDrop(event) {
          var files, i, f;

          if (event != null) {
              event.preventDefault();
              event.dataTransfer = event.dataTransfer ||
                                   event.originalEvent.dataTransfer;
          }

          event.stopPropagation();
          event.preventDefault();

          files = event.dataTransfer.files;

          if (files.length) {
            handleFile(files[0]);
          }
        }

        function onDragOver (event) {
          event.dataTransfer = event.dataTransfer ||
                           event.originalEvent.dataTransfer;

          if (event) event.preventDefault();
          event.dataTransfer.effectAllowed = 'copy';

          return false;
        }

        function popFileChooser (evt) {
          $fileChooser.click();
        }

        $fileChooser.change(function () {
          files = $(this).get(0).files;

          handleFile(files[0]);
        });

        $elem.bind('click', popFileChooser);
        $elem.bind('dragover', onDragOver);
        $elem.bind('dragenter', onDragOver);
        $elem.bind('drop', handleDrop);
      }
    };
  }]);

