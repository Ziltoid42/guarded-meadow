var sendMessage = require('./fbMessage/sendMessage');
var fbMessage = require('./fbMessage/fbMessage');


module.exports = function (senderId, message) {
    
    var messageText = message.text;


    if (messageText.toLowerCase() === 'test') {
        var textReply = new fbMessage
            .PlainText("[DEBUG] SenderId: " + senderId + " Message JSON: " + JSON.stringify(message))
            .compose();

        sendMessage(senderId, textReply);
    }



    //ok now here we can handle generic messages received by the bot...










};