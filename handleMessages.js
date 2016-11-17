var sendMessage = require('./sendMessage');
var fbMessage = require('./fbMessage');
var request = require('request');
var db = require('./db');
//var user = require('./user');
var token = require('./config/appToken');


module.exports = function (sender, message) {
    
    var text = message.text;
    
    


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


        if (text === 'start') {
            //sender.state = "start";
            var promise = new Promise(function(resolve, reject) {
                 resolve(sendTextMessage(sender, "Hello Bong"))
            });

            var send = promise
            .then(()=>{ 
                sendTextMessage(sender, "My name is Creditor and I am a robot!")
               return true; 
            })
            .then(()=>{ 
                sendTextMessage(sender, "If you have business project, you can help you get a credit only by  answering my questions on Facebook!")
            })
            .then(()=>{ 
                var buttons = {
                text:"Now what can I do for you?", 
                title1:"Who are you?", 
                payload1:"Who are you?", 
                title2:"I want a loan", 
                payload2:"I want a loan",
                title3:"I want to guarantee", 
                payload3:"I want to guarantee"}
            })
            .then(()=>{
                var buttonReply = new fbMessage
            .ButtonTemplate(buttons)
            .compose();
            sendMessage(sender.fbid, buttonReply);
             })
            .then(()=>{
                sender.state = 'start';
             })
            .then(()=>{
                db.findSave(sender);
             });
            /*
            sendTextMessage(sender, "Hello Bong")
            sendTextMessage(sender, "My name is Creditor and I am a robot!")
            sendTextMessage(sender, "If you have business project, you can help you get a credit only by  answering my questions on Facebook!")
            var buttons = {
                text:"Now what can I do for you?", 
                title1:"Who are you?", 
                payload1:"Who are you?", 
                title2:"I want a loan", 
                payload2:"I want a loan",
                title3:"I want to guarantee", 
                payload3:"I want to guarantee"}
            
            var buttonReply = new fbMessage
            .ButtonTemplate(buttons)
            .compose();
            sendMessage(sender.fbid, buttonReply);
            db.findSave(sender);
            */
            //continue
        }

        if (text === '1XX1234') {
            sendTextMessage(sender.fbid, "Ok thanks! Can you confirm the model of your motorcycle?")
            sendGenericMessage(sender.fbid)
            //continue
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
            sendLocationMessage(sender.fbid)
            //continue
        }
        //demande location
         /*
        if (message.attachments[0].type === 'location'){
            sendTextMessage(senderId, "lat: "+attachment.payload.coordinates.lat+"\nlong: "+
            attachment.payload.coordinates.long)
            //continue
            }*/

    //fonction pour test 
    
    function sendTextMessage(sender, text) {
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
        }
    })
}

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
    //ok now here we can handle generic messages received by the bot...










};