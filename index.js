'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const db = require('./db');
const fetch = require('node-fetch');
var sendMessage = require('./sendMessage');
var fbMessage = require('./fbMessage');
var handleMessages = require('./handleMessages');
var handlePostbacks = require('./handlePostbacks');
var token = require('./config/appToken');
//var user = require('user'); //Ajout class user

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


// Spin up the server
app.listen(app.get('port'), function(){
    console.log('Running on port', app.get('port')) 
});



// Contenu bootbot
 function sendTypingIndicator(recipientId, milliseconds) {
    const timeout = isNaN(milliseconds) ? 0 : milliseconds;
    if (milliseconds > 20000) {
      milliseconds = 20000;
      console.error('sendTypingIndicator: max milliseconds value is 20000 (20 seconds)');
    }
    return new Promise((resolve, reject) => {
      return this.sendAction(recipientId, 'typing_on').then(() => {
        setTimeout(() => this.sendAction(recipientId, 'typing_off').then((json) => resolve(json)), timeout);
      });
    });
  }

   function getUserProfile(user) {
    const url = `https://graph.facebook.com/v2.6/${user.fbid}?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${token}`;
    return fetch(url)
      .then(res => res.json())
      .catch(err => console.log(`Error getting user profile: ${err}`));
  }




function receivedDeliveryConfirmation(event, timestamp) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var delivery = event.delivery;
  var messageIDs = delivery.mids;
  var watermark = delivery.watermark;
  var sequenceNumber = delivery.seq;

  return new Promise((resolve, reject) => {


  if (timestamp < watermark)
    resolve(true);
  console.log("Timestamp perso: ", timestamp);
  console.log("All message before %d were delivered.", watermark);
})
}


function routeur(event, sender){
   if (event.message && event.message.text) {
    
        handleMessages(sender, event); //fonction routing text

    }

    //messaging_postbacks
    if (event.postback && event.postback.payload) {

        handlePostbacks(sender, event); //fonction routing postbacks
    }

    //message_deliveries not an intresting solution for now
    if (event.delivery && event.delivery.watermark) {

        //receivedDeliveryConfirmation(event);
    }

    //zone test location
   // if (event.message.attachments[0].payload.coordinates.lat && event.message.attachments[0].payload.coordinates.long) {
    //console.log(event.message.attachments[0].payload.coordinates.lat);
    //console.log(event.message.attachments[0].payload.coordinates.long);
    //}


    if (event.message.attachments[0].payload.coordinates.lat && event.message.attachments[0].payload.coordinates.long && sender.state === 'At work') {
                
                sender.work.location.lat = event.message.attachments[0].payload.coordinates.lat;
                sender.work.location.long = event.message.attachments[0].payload.coordinates.long;

                var buttons = {
                        text:'Are you self-employed or do you work for a company and get a monthly salary?', 
                        title1:"Employed by company", 
                        payload1:"Employed", 
                        title2:"Self-employed", 
                        payload2:"Self-employed"}

                    var buttonReply = new fbMessage
                    .ButtonTemplate(buttons)
                    .compose();
                    sendMessage(sender.fbid, buttonReply);
                    sender.state = 'Work coordinates';
                    db.findSave(sender);
            }
    //Fin zone test location
    
}


app.post('/webhook/', function (req, res) {

  let messaging_events = req.body.entry[0].messaging;
  
  for (let i = 0; i < messaging_events.length; i++) {
    
    let event = req.body.entry[0].messaging[i];
    let senderId = event.sender.id;
    let recipient = event.recipient.id;
    var sender =  {name: 'dédé', fbid: senderId, recipient: recipient};

    //Get profile
    var founduser = new db.findfbidtest(sender)
    .then((result)=>{
        sender = result;
      return getUserProfile(result); 
    })
    .then((result)=>{
        sender.first_name = result.first_name;
        sender.last_name = result.last_name;
        sender.profile_pic = result.profile_pic;
        sender.locale = result.locale;
        sender.timezone = result.timezone;
        sender.gender = result.gender;
        return sender;
    })
    .then((result)=>{
        routeur(event, result);
    })
    .catch((err)=>{
            console.error(err)
        });

  }

  res.sendStatus(200);

})


    //fonction pour test
    function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender.fbid},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}


app.use(function(req, res){
   res.sendStatus(400);
});