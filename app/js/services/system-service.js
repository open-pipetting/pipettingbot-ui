angular.module('pbUi.systemService', [])
  .factory('SystemService', [function () {
    'use strict';

		var gui = require('nw.gui')
			,	appGUI = {};

		appGUI.gottenGUI = gui.Window.get();

		appGUI.isMaximized = false;

		// close the App
		appGUI.close = function() {
		  var guiWin = this.gottenGUI;
		  guiWin.close(true);
		};

		// minimize the App
		appGUI.minimize = function() {
		  var guiWin = this.gottenGUI;
		  guiWin.minimize();
		};

		// seems like to not have effect :9
		appGUI.restore = function () {
			var guiWin = this.gottenGUI;
			guiWin.unmaximize();
			this.isMaximized = false;
		};

		// maximize the App
		appGUI.maximize = function() {
		  var guiWin = this.gottenGUI;

		  if (this.isMaximized) {
		  	this.restore();
		  } else {
			  guiWin.maximize();
			  this.isMaximized = true;
		  }
		};

		// open dev tools
		appGUI.openDevTools = function() {
		    var guiWin = gui.Window.get();
		    guiWin.showDevTools();
		};

    return appGUI;
  }]);
