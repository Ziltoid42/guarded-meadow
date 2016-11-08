var sendMessage = require('./sendMessage');
var fbMessage = require('./fbMessage');


module.exports = function (senderId, message) {
    
    var messageText = message.text;


    if (messageText.toLowerCase() === 'test') {
        /*var textReply = new fbMessage
            .PlainText("[DEBUG] SenderId: " + senderId + " Message JSON: " + JSON.stringify(message))
            .compose();

        sendMessage(senderId, textReply);*/
        sendTextMessage(senderId, senderId);
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