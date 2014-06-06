'use strict';

/* Directives */

angular.module('pbUi.directives', [])
  .directive('pbDragFile', [function () {
    return {
      restrict: 'A',
      scope: true,
      link: function ($scope, $elem, $attrs) {

        function _WB_toJSON(workbook) {
          var result = {};
          workbook.SheetNames.forEach(function(sheetName) {
            var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            if(roa.length > 0){
              result[sheetName] = roa;
            }
          });
          return result;
        }

        function _WB_toCSV(workbook) {
          var result = [];
          workbook.SheetNames.forEach(function(sheetName) {
            var csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
            if(csv.length > 0){
              result.push("SHEET: " + sheetName);
              result.push("");
              result.push(csv);
            }
          });
          return result.join("\n");
        }

        var Workbook = {
          toJSON: _WB_toJSON,
          toCSV: _WB_toCSV
        };

        function handleDrop(event) {

          if (event != null) {
              event.preventDefault();
              event.dataTransfer = event.dataTransfer ||
                                   event.originalEvent.dataTransfer;
          }

          var files
            , i
            , f;

          event.stopPropagation();
          event.preventDefault();

          files = event.dataTransfer.files;

          for (i = 0, f = files[i]; i != files.length; ++i) {
            var reader = new FileReader();
            var name = f.name;

            reader.onload = function(event) {
              var data = event.target.result;
              var workbook = XLSX.read(data, {type: 'binary'});

              console.log(Workbook.toCSV(workbook));

            };
            reader.readAsBinaryString(f);
          }
        }

        function onDragOver (event) {
          event.dataTransfer = event.dataTransfer ||
                           event.originalEvent.dataTransfer;

          if (event) event.preventDefault();
          event.dataTransfer.effectAllowed = 'copy';

          return false;
        }

        $elem.bind('dragover', onDragOver);
        $elem.bind('dragenter', onDragOver);
        $elem.bind('drop', handleDrop);
      }
    };
  }]);

