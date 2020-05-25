const app = require("electron");
const ipc = app.ipcRenderer;
const path = require("path");

if(require === undefined){
	console.log("ok");
}

var themeSelected;
var fs = require("fs");
var jsonThemeFilePath = path.join(__dirname,'jsonRecord','themes.json');




function readJsonThemeFile(){

fs.readFile(jsonThemeFilePath,"utf-8",function(e,data){

	var parseJson = JSON.parse(data);

	var themeSplit = parseJson.currentTheme.split("/");

	var themeName = themeSplit[themeSplit.length - 1];

	$(".row section").css({
	
			"border":"0px"
		});


	$("#"+themeName).css({
		"border":"5px solid #929dad"
	});



});

};

$(".cancel").click(function(){

	remote.getCurrentWindow().close()

});