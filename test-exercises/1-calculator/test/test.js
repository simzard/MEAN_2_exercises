/**
 * Created by simon on 3/3/16.
 */
var expect = require("chai").expect;

describe('Calculator', function () {
    var calculator = require('../lib/calculator');
    describe('Test the 4 calculator methods', function () {
        it('should return 5, since 3 + 2 = 5', function () {
            expect(calculator.add(3, 2)).to.be.equal(5);
        });
        it('should return 1, since 3 - 2 = 1', function () {
            expect(calculator.subtract(3, 2)).to.be.equal(1);
        });
        it('should return 6, since 3 * 2 = 6', function () {
            expect(calculator.multiply(3, 2)).to.be.equal(6);
        });
        it('should return 1.5, since 3 / 2 = 1.5', function () {
            expect(calculator.divide(3, 2)).to.be.equal(1.5);
        });
        it('should throw Error("Attempt to divide by zero");', function () {
            function fn() {calculator.divide (3,0);}
            expect(fn).to.throw(Error, /Attempt to divide by zero/);

        });
    })
});