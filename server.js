var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var database = require('./db.js');
var updateVote = database.updateVote;
var saveCandidate = database.saveCandidate;
var getCandidate = database.getCandidate;

var app = express();

app.use(express.static(__dirname + '/client/dist/'))
app.use(bodyParser.json());

app.post('/addCandidate', function(req, res) {
  saveCandidate(req.body.name, function(err, result) {
    if (err) {
      console.log('err', err)
    } else {
      res.send(result);
    }
  })

})

app.get('/getCandidates', function(req, res) {
  getCandidate(function(err, result) {
    if(err) {
      console.log(err);
    }else {
      res.send(result);
    }
  })

})

app.put('/addVote', function(req, res) {
  updateVote(req.body.name, function(err, result) {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})


app.listen(5555, function() {
  console.log('listening on port 5555');
})