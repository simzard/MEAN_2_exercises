/**
 * Created by simon on 3/11/16.
 */

var expect = require('chai').expect;
var request = require('request');
var http = require('http');
var app = require('../app');
var server;
var TEST_PORT = 3456;
var jokes = require('../model/jokes');

before(function (done) {
    var app = require('../app');
    server = http.createServer(app);
    server.listen(TEST_PORT, function () {
        done();
    });
});
after(function (done) {
    server.close();
    done();
});

describe("GET: /api/joke/random", function () {
    var options = {
        url: "http://localhost:" + TEST_PORT + "/api/joke/random",
        method: "GET",
        json: true
    };

    it("Should return either of the 3 jokes in the 'database'", function (done) {
        request(options, function (error, res, body) {
            var randomJoke = body.joke;

            var success = false;
            if (randomJoke == "A day without sunshine is like, night." ||
                randomJoke == "At what age is it appropriate to tell my dog that he's adopted?" ||
                randomJoke == "I intend to live forever, or die trying")
                success = true;

            expect(success).to.be.equal(true);
            done();
        });
    });
});

describe("GET: /api/jokes", function () {

    var options = {
        url: "http://localhost:" + TEST_PORT + "/api/jokes",
        method: "GET",
        json: true
    };
    it("Should return all the jokes in the 'database'", function (done) {
        request(options, function (error, res, body) {

            var supposedJokes = [
                "A day without sunshine is like, night.",
                "At what age is it appropriate to tell my dog that he's adopted?",
                "I intend to live forever, or die trying"
            ];
            var success = true;
            for (var i = 0; i < supposedJokes.length; i++) {
                if (body.jokes[0].joke != supposedJokes[i] ) {
                    success == false;
                    break;
                }
            }

            expect(success).to.be.equal(true);
            done();
        });


    });

});

describe("POST: /api/joke", function () {

    // reset the jokes 'database' to factory defaults :)
    jokes.reset();
    var jokeToAdd = "Knock knock ... Who's there?... ... ... ... ... ... Java?";
    var options = {
        url: "http://localhost:" + TEST_PORT + "/api/joke",
        method: "POST",
        json: true,
        body: {joke: jokeToAdd }
    };
    var theJoke;
    it('Should return the posted joke', function (done) {
        request(options, function (error, res, body) {

            expect(body.joke).to.be.equal(jokeToAdd);;
            // store the joke fetched in out side of this scope variable for furter testing purpose
            theJoke = body.joke;
            done();
        });


    });
    it("Should verify that the posted joke is stored in the 'database'", function (done) {
        var success = false;
        if (jokes.allJokes.indexOf(theJoke)) {
            success = true;
        }
        expect(success).to.be.equal(true);
            done();
    });
});

