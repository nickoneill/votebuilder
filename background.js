chrome.browserAction.onClicked.addListener(function(tab) {
	// js loading for the extension button activation
	// DISABLED: the plugin loads automatically on the right pages now
	
	// chrome.tabs.executeScript(null, {file: "jquery-3.1.0.min.js"}, function() {
	// 	  chrome.tabs.executeScript(null, {file: "content_script.js"});
	// });
});

