var sendMessage = require('./sendMessage');
var fbMessage = require('./fbMessage');
var request = require('request');
var db = require('./db');
//var user = require('./user');
var token = require('./config/appToken');

module.exports = function (senderId, event) {
    
    var payload = event.postback.payload;
    var sender = senderId;

    //if (payload === /* Payload d'une des cartes faire fonction qui fetch dans la lib*/) {
    	//enregistrer les infos en bdd
    	//enregistrer le niveau de la step
    	//envoyer la carte suivante
    //}

            if (payload === 'start') {
            
             var promise = new Promise(function(resolve, reject) {
                 resolve(sendText(sender, "Hello Bong", 1000))});

            var send = promise
            .then(function(){return(sendText(sender, "My name is Creditor and I am a robot!", 2000))})
            .then(function(){return(sendText(sender, "If you have business project, you can help you get a credit only by  answering my questions on Facebook!", 3000))})
            .then(()=>{ 
                var buttons = {
                text:"Now what can I do for you?", 
                title1:"Who are you?", 
                payload1:"Who are you?", 
                title2:"I want a loan", 
                payload2:"I want a loan",
                title3:"I want to guarantee", 
                payload3:"I want to guarantee"}
                return buttons;
            })
            .then((result)=>{
                var buttonReply = new fbMessage
            .ButtonTemplate(result)
            .compose();
            setTimeout(function() {
                sendMessage(sender.fbid, buttonReply);
                }, 4000)
            return true;
             })
            .then(()=>{
                sender.state = 'start';
                return sender;
             })
            .then((sender)=>{
                db.findSave(sender);
                return true;
             }).catch((err)=>{
                console.error(err)
            });
            /*
             var promise = new Promise(function(resolve, reject) {
                 resolve(
                setTimeout(function() {
                    sendTextMessage(sender, "Hello Bong");
                }, 1000))
            });

            var send = promise
            .then(function(){return(
                setTimeout(function() {
                    sendTextMessage(sender, "My name is Creditor and I am a robot!");
                }, 2000)
                )})
            .then(function(){return(
                setTimeout(function() {
                    sendTextMessage(sender, "If you have business project, you can help you get a credit only by  answering my questions on Facebook!");
                }, 3000)
                )})
            .then(()=>{ 
                var buttons = {
                text:"Now what can I do for you?", 
                title1:"Who are you?", 
                payload1:"Who are you?", 
                title2:"I want a loan", 
                payload2:"I want a loan",
                title3:"I want to guarantee", 
                payload3:"I want to guarantee"}
                return buttons;
            })
            .then((result)=>{
                var buttonReply = new fbMessage
            .ButtonTemplate(result)
            .compose();
            setTimeout(function() {
                sendMessage(sender.fbid, buttonReply);
                }, 4000)
            return true;
             })
            .then(()=>{
                sender.state = 'start';
                return sender;
             })
            .then((sender)=>{
                db.findSave(sender);
                return true;
             }).catch((err)=>{
                console.error(err)
            });*/

           
        }




            if (payload === 'apply') {
                var buttons = {
                    text:"Shall we start?", 
                    title1:"Start application", 
                    payload1:"start_app", 
                    title2:"I need more info", 
                    payload2:"more"}
                var buttonReply = new fbMessage
            	.ButtonTemplate(buttons)
            	.compose();

        		sendMessage(senderId, buttonReply);
                //continue
            }   
            if (payload === 'start_app') {
            sendTextMessage(sender, "Good. First, can you write down your motorcycle plate number?")
            //continue
            }
            if (payload === 'honda_dream') {
                var buttons = {
                    text:"How would you describe the overall condition of your motorcycle?", 
                    title1:"Good condition", 
                    payload1:"good", 
                    title2:"Normal condition", 
                    payload2:"normal", 
                    title3:"Poor condition", 
                    payload3:"poor"}
                //continue
            }
            if (payload === 'good') {
                var buttons = {
                    text:"Ok, this looks good! Based on the information you gave me, you can borrow up to 1,500 USD from Barang Ktchey Microfinance! Should we continue?", 
                    title1:"Yes", 
                    payload1:"yes", 
                    title2:"I need less money", 
                    payload2:"less", 
                    title3:"I need more money", 
                    payload3:"more"}
                //continue
            }
            if (payload === 'yes') {
                var buttons = {
                    text:"So I understand you want a loan amounting to 1,500 USD. Now tell me, how long would you like the loan for?", 
                    title1:"6 months", 
                    payload1:"6", 
                    title2:"12 months", 
                    payload2:"12", 
                    title3:"24 months", 
                    payload3:"24"}
                //continue
            }
            if (payload === '6') {
                var buttons = {
                    text:"Ok ok. Then if you want 1,500 USD over 6 month, that means you would pay a total of 138 USD total interest including all fees", 
                    title1:"Continue", 
                    payload1:"validate_loan", 
                    title2:"Change term", 
                    payload2:"change_loan", 
                    title3:"Stop application", 
                    payload3:"quit"}
                //continue
            }
            if (payload === 'validate_loan') {
                var buttons = {
                    text:"Is your name Grégoire?", 
                    title1:"Yes", 
                    payload1:"valid_name", 
                    title2:"No", 
                    payload2:"invalid_name"}
                sendTextMessage(sender, "Great! Let's continue this conversation")
                sendTextMessage(sender, "By the way, I didn't ask your name!")
               //continue
            }  
            if (payload === 'single') {
                var buttons = {
                    text:"Do you have children?", 
                    title1:"Yes", 
                    payload1:"valid_children", 
                    title2:"No", 
                    payload2:"invalid_children"}
                //continue
            } 
             if (payload === 'valid_children') {
                var buttons = {
                    text:"How many children do you have?", 
                    title1:"1 or 2 children", 
                    payload1:"2_children", 
                    title2:"3 or 4 children", 
                    payload2:"4_children", 
                    title3:"5 or 6 children", 
                    payload3:"6_children"}
                //continue
            } 
             if (payload === '2_children') {
                var buttons = {
                    text:"How many children earn their lives?", 
                    title1:"none", 
                    payload1:"no_earner", 
                    title2:"1", 
                    payload2:"1_earner", 
                    title3:"2", 
                    payload3:"2_earner"}
                //continue
            } 
            if (payload === 'no_earner') {
                var buttons = {
                    text:"Where do you live?", 
                    title1:"parents", 
                    payload1:"live_at_parents", 
                    title2:"Alone", 
                    payload2:"live_at_self", 
                    title3:"With brother or sister", 
                    payload3:"live_at_brothers"}
                //continue
            } 
            if (payload === 'live_at_self') {
                var buttons = {
                    text:"And by the way, where are you now?", 
                    title1:"Home", 
                    payload1:"at_home", 
                    title2:"Work", 
                    payload2:"at_work", 
                    title3:"Somewhere else", 
                    payload3:"at_else"}
                //continue
            } 
            if (payload === 'at_home') {
                sendTextMessage(sender, "Ok, can you please let me know where is your home?")
                sendTextMessage(sender, "Just click the button below to let me know!")
                sendLocationMessage(sender)
                //continue
            } 
            if (payload === 'valid_name') {
                sendTextMessage(sender, "How old are you Grégoire?")
                //continue
            } 

            if (buttons) //verifier que ça existe en javascript
            {
            	var buttonReply = new fbMessage
            	.ButtonTemplate(buttons)
            	.compose();

        		sendMessage(senderId, buttonReply);
        		delete buttons; //verifier que ça existe en javascript
            }


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

        function sendText(sender, text, time){

            setTimeout(function() {
                    sendTextMessage(sender, text);
                }, time);
        }
}