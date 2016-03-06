/**
 * Created by simon on 3/3/16.
 */
var path = require('path');
var ext = "." + process.argv[3];
var mymodule = require('./ex6listfiles.js')

callback = function (err, list) {
    if (!err) {
        for (var i = 0; i < list.length; i++) {
            if (path.extname(list[i]) == ext) {
                console.log(list[i]);
            }
        }
    }

}

module.exports = function (dirname, extension, callback) {

};


//
//mymodule(process.argv[2], process.argv[3], function callback(err, list) {
//    if (!err) {
//        for (var i = 0; i < list.length; i++) {
//            if (path.extname(list[i]) == ext) {
//                console.log(list[i]);
//            }
//        }
//    }
//});