var express = require('express');
var bodyParser = require('body-parser');
let DARKSKYAPI = "https://api.darksky.net/forecast/";
let DARKSKYKEY = "7d9ad9898f1ac7024b40e8b42e3102ae";
require('es6-promise').polyfill();
require('isomorphic-fetch');
let port = 3001;

let app = express();
let server = require('http').createServer(app);
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get('/api/',(req, res) => {
  res.json({
    message:"This is the server api"
  });
});

let apiurl = `${DARKSKYAPI}${DARKSKYKEY}/`;
app.get('/api/darksky', (req, res) => {
  try {
    let coordinates = `${req.query.latitude},${req.query.longitude}`;
    let url = apiurl + coordinates;
    console.log('Fetching ' + url);
    fetch(url)
      .then(response => {
        if (response.status != 200){
          res.status(response.status).json({'message': 'Bad response from Dark Sky server'});
        }
        return response.json();
      })
      .then(payload => {
        res.status(200).json(payload);
      })
  } catch(err){
    console.log("Errors occurs requesting Dark Sky API", err);
    res.status(500).json({'message': 'Errors occurs requesting Dark Sky API', 'details' : err});
  }
});
server.listen(port);
console.log('Server is listening on port ' + port);