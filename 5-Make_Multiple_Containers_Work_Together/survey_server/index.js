var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var entry = require('./db_handlers/entry.js');

var app = express();

mongoose.connect('mongodb://localhost:27017/docker_test');


app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views'));

app.use(bodyParser());

app.get('/', (req, res) => {
  res.render('form');
});

app.post('/', (req, res) => {
  console.log(req.body);
  // send body data to database
  var newEntry = new entry();
  newEntry.name = req.body.firstname;

  newEntry.save(function(err) {
    if (err) {
      throw err;
    }
    console.log('SAVED!');
  });

  res.render('another');
});

console.log('listening on port 8080...\n');
app.listen(8080);