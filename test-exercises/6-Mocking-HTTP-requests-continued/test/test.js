/**
 * Created by simon on 3/11/16.
 */
var expect = require('chai').expect;

var tickets = require('../ticketModule');

var nock = require('nock');

var n = nock('http://angularairline-plaul.rhcloud.com');

var testAirline = {
    airline: 'AngularJS Airline',
    flights: [{
        flightID: 'COL2215x100x2016-03-09T08:00:00.000Z',
        numberOfSeats: 4,
        date: '2016-03-09T08:00:00.000Z',
        totalPrice: 340,
        traveltime: 60,
        origin: 'SXF',
        destination: 'CPH'
    }]
};

var testError = {

    "httpError": 400,
    "errorCode": 1,
    "message": "No flights from XXX at the given date"

}

describe('Airline API Get Single Flight', function () {
    before(function (done) {
        n.get('/api/flightinfo/SXF/2016-03-09T00:00:00.000Z/4')
            .reply(200, testAirline);
        done();
    });

    it('should fetch the flight(s)', function (done) {
        tickets.getAvailTickets('SXF', new Date('2016-03-09T00:00:00.000Z'), 4, function (err, body) {
            expect(body.airline).to.be.equal(testAirline.airline);
            expect(body.flights[0].flightID).to.be.equal(testAirline.flights[0].flightID);
            expect(body.flights[0].numberOfSeats).to.be.equal(testAirline.flights[0].numberOfSeats);
            expect(body.flights[0].date).to.be.equal(testAirline.flights[0].date);
            expect(body.flights[0].totalPrice).to.be.equal(testAirline.flights[0].totalPrice);
            expect(body.flights[0].traveltime).to.be.equal(testAirline.flights[0].traveltime);
            expect(body.flights[0].origin).to.be.equal(testAirline.flights[0].origin);
            expect(body.flights[0].destination).to.be.equal(testAirline.flights[0].destination);


            done();

        })


    });
});

describe('Airline API Cause Error', function () {
    before(function (done) {
        n.get('/api/flightinfo/XXX/2016-03-09T00:00:00.000Z/3')
            .reply(200, testError);
        done();
    });

    it('should cause the error', function (done) {
        tickets.getAvailTickets('XXX', new Date('2016-03-09T00:00:00.000Z'), 3, function (err, body) {
            expect(body.httpError).to.be.equal(400);
            expect(body.errorCode).to.be.equal(1);
            expect(body.message).to.be.equal("No flights from XXX at the given date");



            done();

        })


    });
});