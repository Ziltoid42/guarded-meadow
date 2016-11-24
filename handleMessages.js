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
        */




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
                `Is your name ${sender.first_name}`
                var buttons = {
                    text:`So I understand you want a loan amounting to ${sender.loan_amount} USD. Now tell me, how long would you like the loan for?`, 
                    title1:"6 months", 
                    payload1:"6 months", 
                    title2:"12 months", 
                    payload2:"12 months", 
                    title3:"24 months", 
                    payload3:"24 months"}

                     var buttonReply = new fbMessage
                    .ButtonTemplate(buttons)
                    .compose();
                    sendMessage(sender.fbid, buttonReply);
                    sender.state = 'Term';
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
                    title3:"Widow", 
                    payload3:"Widow"}
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

        if (sender.state === 'Work_situation') {
            var work_description = text; // DO Parsing on text

            // NEED DATABASE TO CHECK DESCRIPTION AGAINST A LIST OF JOBS

            sender.work_description = work_description
            var buttons = {
                    text:"Is this your work during the whole year or is it a seasonal job?", 
                    title1:"Whole year", 
                    payload1:"Whole year",
                    title2: "Seasonal job",
                    payload2: "Seasonal job"}
                var buttonReply = new fbMessage
                .ButtonTemplate(buttons)
                .compose();
                sendMessage(sender.fbid, buttonReply);
                sender.state = "Work description";
                db.findSave(sender);

        }

        if (sender.state === 'Work salary') {
            var work_allowance = text; // DO Parsing on text

            // NEED DATABASE TO CHECK DESCRIPTION AGAINST A LIST OF JOBS

            sender.work_allowance = work_allowance
            var buttons = {
                    text:"How many hours do you work this job every week?", 
                    title1:"Less than 25 hours", 
                    payload1:"25h-",
                    title2: "25 - 40 hours",
                    payload2: "25-40h",
                    title3: "more than 40 hours",
                    payload3: "40h+"}
                var buttonReply = new fbMessage
                .ButtonTemplate(buttons)
                .compose();
                sendMessage(sender.fbid, buttonReply);
                sender.state = "Work hours";
                db.findSave(sender);

        }

        if (sender.state === 'work_seasonal') {
            var work_salary = text; // DO Parsing on text

            // NEED DATABASE TO CHECK DESCRIPTION AGAINST A LIST OF JOBS

            sender.work_salary = work_salary
            sendText(sender, 'How much allowance do you get per month?', 1000);
            sendText(sender, 'Allowances are additional payment you get from your employer, like bonus, transportation fee, heart fee …', 2000);
            sendText(sender, 'Can you tell me how much allowance you get per month in USD?', 3000);
            
            sender.state = "Work salary";
            db.findSave(sender);

        }

        if (sender.state === 'Work expense') { // FAIRE SIMPLE SOUSTRACTION REVUNU - EXPENSES
            
            var buttons = {
                    text:"Ok. From the information you tell me, I estimate that you make around ... from your business every month. Is this correct?", 
                    title1:"Yes", 
                    payload1:"valid_revenue",
                    title2: "No",
                    payload2: "invalid_revenue"}
                var buttonReply = new fbMessage
                .ButtonTemplate(buttons)
                .compose();
                sendMessage(sender.fbid, buttonReply);
                sender.state = "Revenue validation";
                db.findSave(sender);

        }

        if (sender.state === 'work_self-employed') {
            var work_salary = text; // DO Parsing on text

            // NEED DATABASE TO CHECK DESCRIPTION AGAINST A LIST OF JOBS

            sender.work_salary = work_salary
            sendText(sender, 'How much do you spend for your business every month?', 1000);
            sendText(sender, 'These expenses may include your stock, your rent fee, payment to employees, payment of electricity bill...', 2000);
            sendText(sender, 'Anything expense related to your business', 3000);
            sendText(sender, 'So, how much is the total amount in USD of your business expenses every month?', 4000);
            
            sender.state = "Work expense";
            db.findSave(sender);

        }

        if (sender.state === 'invalid_revenue') { // FAIRE COMPARAISON REVUNU CALCULE ET DONNE. SI GRO ECART TRIGGER SINON SAVE
            

            sendText(sender, 'Ok, this is very different from my calculation!', 1000);
            sendText(sender, 'Can I ask my staff to call you now?', 2000);
            var buttons = {
                    text:"He will try to understand the situation with you", 
                    title1:"Call now", 
                    payload1:"Call me now",
                    title2: "Call me in 1 hour",
                    payload2: "Call 1 hour",
                    title3: "Call me tomorow",
                    payload3: "Call tomorow"}
                var buttonReply = new fbMessage
                .ButtonTemplate(buttons)
                .compose();
                setTimeout(function() {
                    sendMessage(sender.fbid, buttonReply);
                    }, 3000)
                sender.state = "Revenue call";
                db.findSave(sender);

        }

        //

          if (text === 'test') {
                sendText(sender, "Please enter the amount you would like to borrow");
                sender.state = 'Less';
                db.findSave(sender);

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

    function sendText(sender, text, time){

            setTimeout(function() {
                    sendTextMessage(sender, text);
                }, time);
        }

};