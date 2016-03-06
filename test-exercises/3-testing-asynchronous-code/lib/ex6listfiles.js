// Create a program that prints a list of files
// in a given directory, filtered by the extension
// of the files.

module.exports = function (dirname, ext, callback) {

	var fs = require('fs');
	
	var dir = dirname;
	var ext = "." + ext;

	fs.readdir(dir, callback);
	
};

