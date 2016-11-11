var sendMessage = require('./sendMessage');
var fbMessage = require('./fbMessage');
var request = require('request');
var token = require('./config/appToken');


module.exports = function (senderId, message) {
    
    var messageText = message.text;


    if (messageText.toLowerCase() === 'test') {
        
        //Envoi texte simple via composeur
        /*var textReply = new fbMessage
            .PlainText("[DEBUG] SenderId: " + senderId + " Message JSON: " + JSON.stringify(message))
            .compose();

        sendMessage(senderId, textReply);*/

        //Envoi image via composeur
        /*var imgReply = new fbMessage
            .Image("https://img1.n3rdabl3.co.uk/wp-content/images/uploads/2016/06/32461_berserk.jpg")
            .compose();

        sendMessage(senderId, imgReply);*/
        var buttons = {text:"How would you describe the overall condition of your motorcycle?", title1:"Good condition", payload1:"good"}

        var buttonReply = new fbMessage
            .ButtonTemplate(buttons)
            .compose();

        sendMessage(senderId, buttonReply);
    
    }


        if (text === 'start') {
            sendTextMessage(sender, "Hello Bong")
            sendTextMessage(sender, "My name is Creditor and I am a robot!")
            sendTextMessage(sender, "If you have business project, you can help you get a credit only by  answering my questions on Facebook!")
            var buttons = {
                text:"Now what can I do for you?", 
                title1:"I want more info", 
                payload1:"more info", 
                title2:"I want to apply", 
                payload2:"apply"}
            
            var buttonReply = new fbMessage
            .ButtonTemplate(buttons)
            .compose();
            sendMessage(senderId, buttonReply);
            //continue
        }

        if (text === '1XX1234') {
            sendTextMessage(sender, "Ok thanks! Can you confirm the model of your motorcycle?")
            sendGenericMessage(sender)
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
            sendMessage(senderId, buttonReply);
            //continue
        }
        if (text === 'location') {
            sendLocationMessage(sender)
            //continue
        }

    //fonction pour test 
    
    function sendTextMessage(sender, text) {
    messageData = { text:text }
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


    //ok now here we can handle generic messages received by the bot...










};