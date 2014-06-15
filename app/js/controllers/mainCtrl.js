angular.module('pbUi.mainCtrl', [])
  .controller('mainCtrl', ['$scope', function($scope) {
  	$scope.currentTab = window.location.hash.slice(2) || "home";
  }]);
