/*'use strict'

const express = require('express');
const bodyParser = require('body-parser')
const request = require('request')
const app = express();
//var fbMessengerBot = require('./fbMessengerBot/');

// Manual port selection
app.set('port', (process.env.PORT || 5000));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Parse application/json
app.use(bodyParser.json());

// For facebook verification
app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');    
  }
});

// Where the app runs
//app.post('/webhook/', fbMessengerBot);


app.use(function(req, res){
   res.sendStatus(400);
});

// Spin up the server
app.listen(app.get('port'), function(){
	console.log('Running on port', app.get('port'))	
}); */