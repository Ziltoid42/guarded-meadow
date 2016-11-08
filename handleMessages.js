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
        var buttons = {text:"How would you describe the overall condition of your motorcycle?", title1:"Good condition", payload1:"good", title2:"Normal condition", payload2:"normal"}

        var buttonReply = new fbMessage
            .ButtonTemplate(buttons)
            .compose();

        sendMessage(senderId, buttonReply);
    
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