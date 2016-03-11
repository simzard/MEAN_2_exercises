var express = require('express');
var router = express.Router();
var jokes = require('../model/jokes');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('/joke');
});

router.get('/joke', function (req, res, next) {
    if(req.session.jokeCount) {
        req.session.jokeCount++;
    } else {
        req.session.jokeCount = 1;
    }
    res.render('index', {userName: req.session.userName});
});

router.get('/randomJoke', function (req, res, next) {
    res.render('random-joke', {joke: jokes.getRandomJoke()});
});

router.get('/jokes', function (req, res, next) {
    if(req.session.jokesCount) {
        req.session.jokesCount++;
    } else {
        req.session.jokesCount = 1;
    }
    res.render('show-all-jokes', {jokes: jokes.allJokes});
});

router.get('/addJoke', function (req, res, next) {
    res.render('create-joke');
});

router.post('/storeJoke', function (req, res, next) {
    if(req.session.storeJokeCount) {
        req.session.storeJokeCount++;
    } else {
        req.session.storeJokeCount = 1;
    }
    jokes.addJoke(req.body.joke);
    res.render('create-joke', {result: 'Joke Succesfully Added'});
});

router.get('/login', function (req, res, next) {
    res.render('login');
})

router.get('/api/joke/random', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({"joke": jokes.getRandomJoke()}))
})

router.get('/api/jokes', function(req, res, next){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({"jokes": jokes.allJokes}))
})

router.post('/api/joke', function(req, res, next){
    jokes.addJoke(req.body.joke)
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({"joke": req.body.joke}));
    //res.end("{}")
})

module.exports = router;
