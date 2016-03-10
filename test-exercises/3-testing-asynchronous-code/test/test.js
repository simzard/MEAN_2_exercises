var expect = require("chai").expect;

describe('myModule', function () {
    var fs = require('fs');
    before(function(){
        // create a directory testdir and populate it with 5 .js files

        fs.mkdirSync(__dirname + '/testdir');
        for (var i = 1; i <= 5; i++) {
            fs.writeFileSync(__dirname + '/testdir/' + i + '.js', i );
        }
    });
    it("should find five *.js files", function (done) {
        console.log(__dirname);
        var myModule = require('../lib/ex6module')
        myModule(__dirname + "/testdir", "js", function (err, data) {
            if (err) {
                throw err;
            }
            //assert.equal(data.length , 2);
            expect(data.length).to.be.equal(5);
            done();
        });
    });
    after(function() {
        // delete the 5 files and remove the testdir directory
        for (var i = 1; i <= 5; i++) {
            fs.unlinkSync(__dirname + '/testdir/' + i + '.js');
        }
        fs.rmdirSync(__dirname + '/testdir');

    })
});