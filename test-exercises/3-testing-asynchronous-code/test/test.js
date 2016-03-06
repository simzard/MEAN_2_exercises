var expect = require("chai").expect;

describe('myModule', function () {
    it("should find five *.js files", function (done) {
        var myModule = require('../lib/ex6myModule')
        myModule("testdir", "js", function (err, data) {
            if (err) {
                throw err;
            }
            //assert.equal(data.length , 2);
            expect(data.length).to.be.equal(5);
            done();
        });
    });
})