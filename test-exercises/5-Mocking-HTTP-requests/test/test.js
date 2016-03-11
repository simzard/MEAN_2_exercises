/**
 * Created by simon on 3/11/16.
 */

var expect = require('chai').expect;
var jokes = require('../modules/joke');
var nock = require('nock');
var testJoke = {"id": 1234, "joke": "ha ha ha", "reference": "unknown"};

var mockJokes = [
    "A day without sunshine is like, night.",
    "At what age is it appropriate to tell my dog that he's adopted?",
    "I intend to live forever, or die trying"
];

var n = nock('http://jokes-plaul.rhcloud.com'); // when we go to this url use the nock instead

describe('Joke API Get Single Joke', function () {
    before(function (done) {
        n.get('/api/joke')
            .reply(200, testJoke);
        done();
    });

    it('should fetch the ha ha ha joke', function (done) {
        jokes.getJoke(function (err, joke) {
            if (err) {
                throw err;
            }
            expect(joke.reference).to.be.equal("unknown");
            expect(joke).to.be.eql(testJoke);
            done();
        })
    });
});

describe('Joke API Get All Jokes', function () {
    before(function (done) {
        n.get('/api/jokes')
            .reply(200, mockJokes);
        done();
    });

    it('should fetch all jokes', function (done) {
        jokes.getJokes(function (err, jokes) {
            if (err) {
                throw err;
            }
            var success = true;
            for (var i = 0; i < mockJokes.length; i++) {
                if (jokes[i] != mockJokes[i]) {
                    success = false;
                    break;
                }

            }
            expect(success).to.be.equal(true);
            expect(jokes.length).to.be.equal(mockJokes.length);
            done();
        })
    });
});

describe('Joke API Get Random Joke', function () {
    before(function (done) {
        n.get('/api/joke/random')
            .reply(200, testJoke);
        done();
    });

    it('should fetch a `random` joke ', function (done) {
        jokes.getRandomJoke(function (err, randomJoke) {
            if (err) {
                throw err;
            }
            expect(randomJoke.joke).to.be.equal("ha ha ha");

            done();
        })
    });
});

describe('Joke API Post Joke', function () {
    before(function (done) {
        n.post('/api/joke')
            .reply(200, "Joke added");
        done();
    });

    it('should return the Joke added message ', function (done) {
        jokes.addJoke(testJoke, function (err, message) {
            if (err) {
                throw err;
            }
            expect(message.message).to.be.equal("Joke added");

            done();
        })
    });
});


