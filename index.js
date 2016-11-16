'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const db = require('./db');
var handleMessages = require('./handleMessages');
var handlePostbacks = require('./handlePostbacks');
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

// Where the app runs
//app.post('/webhook/', fbMessengerBot);

//Zone function test promise//
var user = {name: 'gregoun', fbid: 2132};


var promise = new Promise(function(resolve, reject) {
  resolve(db.findfbid(user));
});

promise
.then((result)=>{
  console.log("dans then: ", result); // 1
  return result; 
}).catch((err)=>{
        console.error(err)
    });
/*
console.log("promise a la fin: ", promise);

/*
promise.then(function(val) {
  console.log(val); // 1
  return val + 2;
}).then(function(val) {
  console.log(val); // 3
})


*/
//Fin zone test//
 



function fillUser(user){
  //  console.log("dans fill");
//console.log(user);
    new Promise(function(res, rej){
        // Use connect method to connect to the Server

        res(db.find(user)); 
        })
}

function assignUser(user) {
//function insert(object){
    fillUser(user)
    .then(function(result){
        return result;    
    })
    .catch((err)=>{
        console.error(err)
    })
    
}

function routeur(event, sender){
   if (event.message && event.message.text) {
      console.log(sender);
      console.log("passe par message");
        //handleMessages(sender, event.message); //fonction routing text

    }


    //messaging_postbacks
    if (event.postback && event.postback.payload) {

      console.log(sender);
      console.log("pass par postback");
        handlePostbacks(sender, event.postback); //fonction routing postbacks

    }
}

//user = filluser(user.fbid);


app.post('/webhook/', function (req, res) {

  let messaging_events = req.body.entry[0].messaging;
  
  for (let i = 0; i < messaging_events.length; i++) {
    
    let event = req.body.entry[0].messaging[i];
    let senderId = event.sender.id;
    let recipient = event.recipient.id;
    var sender =  {name: 'gregoun', fbid: senderId};
    var user = {name: 'gregoun', fbid: 2132};
    //zone test




    //
    console.log("passage d'un message");
    //console.log(user);
    var coquin = new assignUser(user.fbid);
    console.log(coquin);
    //routeur(senderId, event);
    

    //messages
    if (event.message && event.message.text) {
      
        //console.log(sender, "coucou !");
        //handleMessages(sender, event.message); //fonction routing text

    }


    //messaging_postbacks
    if (event.postback && event.postback.payload) {

      
        handlePostbacks(sender, event.postback); //fonction routing postbacks

    }

    //messaging_optins
    /* gestion abonnements a gérer plus tard
    if (event.optin && event.optin.ref) {

        handleOptins(sender, event.optin);

    }
    */

    //message_deliveries
    /* Pas sur de l'utilité
    if (event.delivery && event.delivery.watermark) {

    }
    */

  }

  res.sendStatus(200);

})

   //token en clair?
    const token ="EAANr7IiG6MUBAKe485oFGnz4IfZCqJRdF4nvYQDTSr62U862zIK3A7T8DMnSy6I8C8wtIM3LfpNWoYTqAqEHrZB960rApV59FOMguvTdBFMss26Lavyw4ISoVZAHIez9rdC3JiNKElqS9lmWR3W9fZBvUfJoYz2Fkx8PXLHKZAAZDZD"


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


// Debut du code a rebosser
/*
app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
      let event = req.body.entry[0].messaging[i]
      let sender = event.sender.id
      if (event.message && event.message.text) {
        let text = event.message.text
        if (text === 'Generic') {
            sendGenericMessage(sender)
            continue
        }
        if (text === 'Bouttons') {
            sendButtonMessage(sender)
            continue
        }
        if (text === 'location') {
            sendLocationMessage(sender)
            continue
        }
        if (text === 'start') {
            sendTextMessage(sender, "Hello Bong")
            sendTextMessage(sender, "My name is Creditor and I am a robot!")
            sendTextMessage(sender, "If you have business project, you can help you get a credit only by  answering my questions on Facebook!")
            var buttons = {text:"Now what can I do for you?", title1:"I want more info", payload1:"more info", title2:"I want to apply", payload2:"apply"}
            send2ButtonMessage(sender, buttons)
            continue
        }

        if (text === '1XX1234') {
            sendTextMessage(sender, "Ok thanks! Can you confirm the model of your motorcycle?")
            sendGenericMessage(sender)
            continue
        }
        if (text === '28') {
             var buttons = {text:"Please tell me about your personal situation", title1:"Single", payload1:"single", title2:"Married", payload2:"married", title3:"Widow", payload3:"widow"}
            send3ButtonMessage(sender, buttons)
            continue
        }
        sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
    }

      if (event.postback) {
        let text = JSON.stringify(event.postback)
            if (event.postback.payload === 'apply') {
                var buttons = {text:"Shall we start?", title1:"Start application", payload1:"start_app", title2:"I need more info", payload2:"more"}
                send2ButtonMessage(sender, buttons)
                continue
            }   
            if (event.postback.payload === 'start_app') {
            sendTextMessage(sender, "Good. First, can you write down your motorcycle plate number?")
            continue
            }
            if (event.postback.payload === 'honda_dream') {
                var buttons = {text:"How would you describe the overall condition of your motorcycle?", title1:"Good condition", payload1:"good", title2:"Normal condition", payload2:"normal", title3:"Poor condition", payload3:"poor"}
                send3ButtonMessage(sender, buttons)
                continue
            }
            if (event.postback.payload === 'good') {
                var buttons = {text:"Ok, this looks good! Based on the information you gave me, you can borrow up to 1,500 USD from Barang Ktchey Microfinance! Should we continue?", title1:"Yes", payload1:"yes", title2:"I need less money", payload2:"less", title3:"I need more money", payload3:"more"}
                send3ButtonMessage(sender, buttons)
                continue
            }
            if (event.postback.payload === 'yes') {
                var buttons = {text:"So I understand you want a loan amounting to 1,500 USD. Now tell me, how long would you like the loan for?", title1:"6 months", payload1:"6", title2:"12 months", payload2:"12", title3:"24 months", payload3:"24"}
                send3ButtonMessage(sender, buttons)
                continue
            }
            if (event.postback.payload === '6') {
                var buttons = {text:"Ok ok. Then if you want 1,500 USD over 6 month, that means you would pay a total of 138 USD total interest including all fees", title1:"Continue", payload1:"validate_loan", title2:"Change term", payload2:"change_loan", title3:"Stop application", payload3:"quit"}
                send3ButtonMessage(sender, buttons)
                continue
            }
            if (event.postback.payload === 'validate_loan') {
                var buttons = {text:"Is your name Grégoire?", title1:"Yes", payload1:"valid_name", title2:"No", payload2:"invalid_name"}
                sendTextMessage(sender, "Great! Let's continue this conversation")
                sendTextMessage(sender, "By the way, I didn't ask your name!")
                send2ButtonMessage(sender, buttons)
                continue
            }  
            if (event.postback.payload === 'single') {
                var buttons = {text:"Do you have children?", title1:"Yes", payload1:"valid_children", title2:"No", payload2:"invalid_children"}
                send2ButtonMessage(sender, buttons)
                continue
            } 
             if (event.postback.payload === 'valid_children') {
                var buttons = {text:"How many children do you have?", title1:"1 or 2 children", payload1:"2_children", title2:"3 or 4 children", payload2:"4_children", title3:"5 or 6 children", payload3:"6_children"}
                send3ButtonMessage(sender, buttons)
                continue
            } 
             if (event.postback.payload === '2_children') {
                var buttons = {text:"How many children earn their lives?", title1:"none", payload1:"no_earner", title2:"1", payload2:"1_earner", title3:"2", payload3:"2_earner"}
                send3ButtonMessage(sender, buttons)
                continue
            } 
            if (event.postback.payload === 'no_earner') {
                var buttons = {text:"Where do you live?", title1:"parents", payload1:"live_at_parents", title2:"Alone", payload2:"live_at_self", title3:"With brother or sister", payload3:"live_at_brothers"}
                send3ButtonMessage(sender, buttons)
                continue
            } 
            if (event.postback.payload === 'live_at_self') {
                var buttons = {text:"And by the way, where are you now?", title1:"Home", payload1:"at_home", title2:"Work", payload2:"at_work", title3:"Somewhere else", payload3:"at_else"}
                send3ButtonMessage(sender, buttons)
                continue
            } 
            if (event.postback.payload === 'at_home') {
                sendTextMessage(sender, "Ok, can you please let me know where is your home?")
                sendTextMessage(sender, "Just click the button below to let me know!")
                sendLocationMessage(sender)
                continue
            } 
            if (event.postback.payload === 'valid_name') {
                sendTextMessage(sender, "How old are you Grégoire?")
                continue
            } 

        if (event.message.attachments[0].type === 'location'){
            sendTextMessage(sender, "lat: "+attachment.payload.coordinates.lat+"\nlong: "+
attachment.payload.coordinates.long)
            continue
        }

        sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
        continue
      }
    }
    res.sendStatus(200)
  })

const token ="EAANr7IiG6MUBAOBTNvbAzHt1xACzYL7KZBZAHfiFK66bNDQg34uksr9KkXiKzLnyhE4XEbSpXaZAkXTDRfZAgjb4gX1ya8UA6keT7Pf8NHwIbU4wWTx46QIVLGWvJLHY5Y4u9ZA4KFgYjlniTZBH6lXBz1CwGxAiuK5675J1ffpAZDZD"

function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
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

function sendGenericMessage(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Honda dream",
                    "image_url": "http://www.hireamotorbikechiangmai.com/wp-content/uploads/2014/01/bike_dream.jpg",
                    "buttons": [ {
                        "type": "postback",
                        "title": "My moto is like this",
                        "payload": "honda_dream",
                    }],
                }, {
                    "title": "Honda Wave",
                    "image_url": "http://www.manager.co.th/asp-bin/Image.aspx?ID=808778",
                    "buttons": [{
                        "type": "postback",
                        "title": "Postback",
                        "payload": "honda_wave",
                    }],
                }]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
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

function send2ButtonMessage(sender, buttons) {
    let messageData = {

    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text": buttons.text,
        "buttons":[
          {
            "type":"postback",
            "title":buttons.title1,
            "payload":buttons.payload1
          },
          {
            "type":"postback",
            "title":buttons.title2,
            "payload":buttons.payload2
          }
        ]
      }
    }
  }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
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

function send3ButtonMessage(sender, buttons) {
    let messageData = {

    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text": buttons.text,
        "buttons":[
          {
            "type":"postback",
            "title":buttons.title1,
            "payload":buttons.payload1
          },
          {
            "type":"postback",
            "title":buttons.title2,
            "payload":buttons.payload2
          },
          {
            "type":"postback",
            "title":buttons.title3,
            "payload":buttons.payload3
          }
        ]
      }
    }
  }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
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

function sendLocationMessage(sender) {
    let messageData = {
            "text":"Please share your location:",
            "quick_replies":[
         {
            "content_type":"location",
        }
        ]
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
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

*/
//Fin du code a rebosser