var gui = require('nw.gui')
	,	appGui = {};

// Store the GUI window
appGUI.getGUI = gui.Window.get();

// close the App
appGUI.close = function() {
  var guiWin = this.getGUI;
  guiWin.close(true);
}

// minimize the App
appGUI.minimize = function() {
  var guiWin = this.getGUI;
  guiWin.minimize();
}

// maximize the App
appGUI.maximize = function() {
  var guiWin = this.getGUI;
  guiWin.maximize();
}

// open dev tools
appGUI.openDevTools = function() {
    var guiWin = gui.Window.get();
    guiWin.showDevTools();
}
