var sendMessage = require('./sendMessage');
var fbMessage = require('./fbMessage');
var request = require('request');
var db = require('./db');
var plateController = require('./plateController');
var loanController = require('./loanController');
var ageController = require('./ageController');
var token = require('./config/appToken');


module.exports = function (sender, event) {
    
    var text = event.message.text;


    /* TODO
     function sendTypingIndicator(recipientId, milliseconds) {
    const timeout = isNaN(milliseconds) ? 0 : milliseconds;
    console.log("passe par typer");
    if (milliseconds > 20000) {
      milliseconds = 20000;
      console.error('sendTypingIndicator: max milliseconds value is 20000 (20 seconds)');
    }
    return new Promise((resolve, reject) => {
      return sendAction(recipientId, 'typing_on').then(() => {
        setTimeout(() => sendAction(recipientId, 'typing_off').then((json) => resolve(json)), timeout);
      });
    });
  }*/


    if (text.toLowerCase() === 'test') {
        
        //Envoi texte simple via composeur
        /*var textReply = new fbMessage
            .PlainText("[DEBUG] SenderId: " + senderId + " Message JSON: " + JSON.stringify(message))
            .compose();

        sendMessage(senderId, textReply);*/

        //Envoi image via composeur
        /*var imgReply = new fbMessage
            .Image("https://img1.n3rdabl3.co.uk/wp-content/images/uploads/2016/06/32461_berserk.jpg")
            .compose();

        sendMessage(senderId, imgReply);
        */var buttons = {
            text:"How would you describe the overall condition of your motorcycle?", 
            title1:"Good condition", 
            payload1:"good"}

        var buttonReply = new fbMessage
            .ButtonTemplate(buttons)
            .compose();
            
        sendTextMessage(sender.fbid, "test ok");
    
    }


       

        if (sender.state === 'Plate number') {
            var Plate;
            plate = plateController.plateFind(text)
            if (plate){
                sender.plate = plate;
                sender.state = "Plate valid";
                db.findSave(sender);
            }else{
                sendText(sender, "Sorry, I cannot find this plate number. Please check if you entered the number correctly. If not, please re-enter the plate number now!", 1000);
                sender.state = "Plate error";
                db.findSave(sender);
            }

        }

        if (sender.state === 'Plate valid') {
            sendTextMessage(sender, "Ok thanks! Can you confirm the model of your motorcycle?");
            sendGenericMessage(sender);
        }

        if (sender.state === 'Plate error') {
            var buttons = {
                    text:"I still cannot find your plate number. Do you want to talk to our staff?", 
                    title1:"Yes", 
                    payload1:"Talk to staff", 
                    title2:"No", 
                    payload2:"Abort"}
                var buttonReply = new fbMessage
                .ButtonTemplate(buttons)
                .compose();
                sendMessage(sender.fbid, buttonReply);
                sender.state = "Talk to staff";
                db.findSave(sender);

        }

        if (sender.state === 'Less') {
            var loan;
            loan = loanController.loanFind(text) // a finir
            if (loan){
                sender.loan_amount = loan;
                sender.state = "Loan valid";
                db.findSave(sender);
            }else{
                sendTextMessage(sender, "Sorry, loan amount must be between 500 and 1500 USD");
                sender.state = "Loan error";
                db.findSave(sender);
            }
        }

        if (sender.state === 'Valid_name') {
            var age;
            age = ageController.ageFind(text) 
            if (age){
                sender.age = age;
                sender.state = "valid age";
                var buttons = {
                    text:"Please tell me about your personal situation", 
                    title1:"Single", 
                    payload1:"Single", 
                    title2:"Married", 
                    payload2:"Married",
                    title2:"Widow", 
                    payload2:"Widow"}
                var buttonReply = new fbMessage
                .ButtonTemplate(buttons)
                .compose();
                sendMessage(sender.fbid, buttonReply);
                db.findSave(sender);
            }else{
                var buttons = {
                    text:"I am sorry but I can only provide a loan to people aged between 20 and 58 years old...", 
                    title1:"Stop Application", 
                    payload1:"Abort"}
                var buttonReply = new fbMessage
                .ButtonTemplate(buttons)
                .compose();
                sendMessage(sender.fbid, buttonReply);
                sender.state = "Abort";
                db.findSave(sender);
            }
        }

        if (text === '28') {
             var buttons = {
                text:"Please tell me about your personal situation", 
                title1:"Single", 
                payload1:"single", 
                title2:"Married", 
                payload2:"married", 
                title3:"Widow", 
                payload3:"widow"}
            
            var buttonReply = new fbMessage
            .ButtonTemplate(buttons)
            .compose();
            sendMessage(sender.fbid, buttonReply);
            //continue
        }
        if (text === 'location') {
            sendLocationMessage(sender)

        }



//messages functions area, move later

    //promified texts    
    function sendTextMessage(sender, text) {
    new Promise(function(resolve, reject) {
    messageData = { text:text }
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
            reject(response.body.error);
        }
        resolve(true);
    })
})}

//generic with motorbikes
function sendGenericMessage(sender) {
    messageData = {
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
                        "title": "My moto is like this",
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

// Basic location message
function sendLocationMessage(sender) {
    messageData = {
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

};