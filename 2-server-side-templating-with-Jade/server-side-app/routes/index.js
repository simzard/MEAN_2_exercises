var express = require('express');
var router = express.Router();
var jokes = require('../model/jokes')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/joke');
});

router.get('/joke', function(req, res, next) {
   res.render('index', { title: 'Jokes' });
});

router.get('/randomJoke', function(req, res, next) {
   res.render('random-joke', { joke: jokes.getRandomJoke()});
});

router.get('/jokes', function (req, res, next) {
    res.render('show-all-jokes', {jokes: jokes.allJokes});
});

router.get('/addJoke', function (req, res, next) {
    res.render('create-joke');
});

router.post('/storeJoke', function (req, res, next) {
    jokes.addJoke(req.body.joke);
    res.render('create-joke', { result: 'Joke Succesfully Added' });
});


module.exports = router;
