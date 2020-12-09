const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// API calls
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var async = require('async');
var cors = require('cors');
app.use(cors());

var routes = require('./routes');
app.use('/api', routes);

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

// if (process.env.NODE_ENV === 'production') {
//   // Serve any static files
//   app.use(express.static(path.join(__dirname, 'client/build')));

//   var routes = require('./api/routes');

//   app.use('/api', routes);
//   // app.use('/api', routes);


//   // Handle React routing, return all requests to React app
//   app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });
// }


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  var routes = require('./routes');
  app.use('/api', routes);
  
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}


app.listen(port, () => console.log(`SUP... PROT -->   ${port}`));
