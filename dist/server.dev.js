"use strict";

var express = require('express');

var path = require('path');

var app = express();
var port = process.env.PORT || 5000; // API calls

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var async = require('async');

var cors = require('cors');

app.use(cors());

var routes = require('./routes');

app.use('/api', routes);
app.get('/api/hello', function (req, res) {
  res.send({
    express: 'Hello From Express'
  });
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express["static"](path.join(__dirname, 'client/build')));

  var routes = require('./api/routes');

  app.use('/.netlify/functions/server', routes); // app.use('/api', routes);
  // Handle React routing, return all requests to React app

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, function () {
  return console.log("SUP... PROT -->   ".concat(port));
});