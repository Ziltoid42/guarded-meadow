var sendMessage = require('./sendMessage');
var fbMessage = require('./fbMessage');
var request = require('request');
var db = require('./db');
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
            .then(sendText(sender, "My name is Creditor and I am a robot!", 2000))
            .then(sendText(sender, "If you have business project, you can help you get a credit only by  answering my questions on Facebook!", 3000))
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
            
        }


            if (payload === 'Who are you?') {

                var promise = new Promise(function(resolve, reject) {
                 resolve(sendText(sender, "I am a robot!", 1000))});

                var send = promise
                .then(sendText(sender, "It means I only exist inside a computer", 2000))
                .then(sendText(sender, "You cannot really have a conversation with me, but I can provide you information about our lending service, and I can collect information about you and tell you if you are eligible for a loan", 3000))
                .then(()=>{ 
                var buttons = {
                text:"Now what would you like to do",  
                title1:"I want a loan", 
                payload1:"I want a loan",
                title2:"I want to guarantee", 
                payload2:"I want to guarantee"}
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
                    sender.state = 'Who are you?';
                    return sender;
                 })
                .then((sender)=>{
                    db.findSave(sender);
                    return true;
                 }).catch((err)=>{
                    console.error(err)
                });
            }


            if (payload === 'I want a loan') {
                
                var promise = new Promise(function(resolve, reject) {
                 resolve(sendText(sender, "Alright, you knock at the right door then!", 1000))});

                var send = promise
                .then(sendText(sender, "Here you can get the cheapest loan in Cambodia", 2000))
                .then(sendText(sender, "For 1,000 USD, we charge only 12 USD interest per month!", 3000))
                .then(()=>{ 
                var buttons = {
                text:"Now what can I do for you?", 
                title1:"Who are you?", 
                payload1:"Who are you?", 
                title2:"I want to know more", 
                payload2:"Get info",
                title3:"I want to apply", 
                payload3:"I want to apply"}
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
                    sender.state = 'I want a loan';
                    return sender;
                 })
                .then((sender)=>{
                    db.findSave(sender);
                    return true;
                 }).catch((err)=>{
                    console.error(err)
                });
            }

            if (payload === 'I want to guarantee') { //Fill later when more info availlable
                
            }

            if (payload === 'Get info') {

                var buttons = {
                text:"What do you want to know??", 
                title1:"Loan amount and term", 
                payload1:"Loan amount and term", 
                title2:"Interest rate", 
                payload2:"Interest rate",
                title3:"Conditions", 
                payload3:"Conditions"}

                var buttonReply = new fbMessage
                .ButtonTemplate(buttons)
                .compose();
                sendMessage(sender.fbid, buttonReply);
                sender.state = 'Get info';
                db.findSave(sender);
                
            }

            if (payload === 'Loan amount and term') {
                
                var promise = new Promise(function(resolve, reject) {
                 resolve(sendText(sender, "As for the amount, you can borrow from 500 USD up to 2000 USD.", 1000))});

                var send = promise
                .then(sendText(sender, "You can borrow this amount for minimum 6 months and up to 2 years", 2000))
                .then(()=>{ 
                var buttons = {
                text:"Do you need more information?", 
                title1:"Interest rate", 
                payload1:"Interest rate", 
                title2:"Conditions", 
                payload2:"Conditions",
                title3:"I want to apply", 
                payload3:"I want to apply"}
                return buttons;
                })
                .then((result)=>{
                    var buttonReply = new fbMessage
                .ButtonTemplate(result)
                .compose();
                setTimeout(function() {
                    sendMessage(sender.fbid, buttonReply);
                    }, 3000)
                return true;
                 })
                .then(()=>{
                    sender.state = 'Loan amount and term';
                    return sender;
                 })
                .then((sender)=>{
                    db.findSave(sender);
                    return true;
                 }).catch((err)=>{
                    console.error(err)
                });
            }

            if (payload === 'Interest rate') {
                var promise = new Promise(function(resolve, reject) {
                 resolve(sendText(sender, "Don't worry, we provide the cheapest loan you can find in Cambodia", 1000))});

                var send = promise
                .then(sendText(sender, "With Barang Ktchey Microfinance, the loans are provided directly by foreigner from Europe. They lend you for a low rate to help you set up a business or succeed in your projects", 2000))
                .then(sendText(sender, "The interest rate for the loan is 1.2% per month + 30 USD only one time", 3000))
                .then(sendText(sender, "For a 1,000 USD loan, it means 12 USD interest every month", 4000))
                .then(sendText(sender, "30 USD is a service fee you need to pay only one time, before you get the loan", 5000))
                .then(sendText(sender, "Example, if you get 1,000 USD for 1 year, you will pay total 144 USD + 30 USD", 6000))
                .then(sendText(sender, "So total 174 USD for 1 year", 7000))
                .then(sendText(sender, "1.2% + 30 USD is the maximum you will pay. Actually, our customer usually get a discount of 30 USD or even 80 USD. It will depend on how we like your project!", 8000))

                .then(()=>{ 
                var buttons = {
                text:"Do you need more information?", 
                title1:"Loan amount and term", 
                payload1:"Loan amount and term", 
                title2:"Conditions", 
                payload2:"Conditions",
                title3:"I want to apply", 
                payload3:"I want to apply"}
                return buttons;
                })
                .then((result)=>{
                    var buttonReply = new fbMessage
                .ButtonTemplate(result)
                .compose();
                setTimeout(function() {
                    sendMessage(sender.fbid, buttonReply);
                    }, 9000)
                return true;
                 })
                .then(()=>{
                    sender.state = 'Interest rate';
                    return sender;
                 })
                .then((sender)=>{
                    db.findSave(sender);
                    return true;
                 }).catch((err)=>{
                    console.error(err)
                });
            }

            if (payload === 'Conditions') {
                var promise = new Promise(function(resolve, reject) {
                 resolve(sendText(sender, "First, you need to be the owner of your motorcycle. It means you need to have a registration card with your name on it", 1000))});

                var send = promise
                .then(sendText(sender, "When you get a loan with Barang Ktchey Microfinance, we will take your motorcycle registration card as a guarantee, this is all we need! And you can keep your motorcycle of course, we just take the registration card until you pay off the loan", 2000))
                .then(sendText(sender, "Also you need to have enough monthly revenu to be able to pay back your loan", 3000))
                .then(sendText(sender, "We will also ask you for some documents to prove your identity, your current address and you income", 4000))
                .then(sendText(sender, "Finally, we provide loans for business projects only. So we can lend you money for a purpose that will help you get more income,but not if you want to buy a phone or home appliance", 5000))
    
                .then(()=>{ 
                var buttons = {
                text:"Do you need more information?", 
                title1:"Loan amount and term", 
                payload1:"Loan amount and term", 
                title2:"Interest rate", 
                payload2:"Interest rate",
                title3:"I want to apply", 
                payload3:"I want to apply"}
                return buttons;
                })
                .then((result)=>{
                    var buttonReply = new fbMessage
                .ButtonTemplate(result)
                .compose();
                setTimeout(function() {
                    sendMessage(sender.fbid, buttonReply);
                    }, 6000)
                return true;
                 })
                .then(()=>{
                    sender.state = 'Conditions';
                    return sender;
                 })
                .then((sender)=>{
                    db.findSave(sender);
                    return true;
                 }).catch((err)=>{
                    console.error(err)
                });
            }

            if (payload === 'I want to apply') {
                 var promise = new Promise(function(resolve, reject) {
                 resolve(sendText(sender, "Great, I will guide you through the process of applying for a loan with Barang Ktchey Microfinance!", 1000))});

                var send = promise
                .then(sendText(sender, "Note that you can leave this conversation at any time, and come back to it. I will remember all the information you have already provided :)", 2000))
                .then(sendText(sender, "First, let me ask you a few question so that I can know how much maximum you can borrow", 3000))
                .then(()=>{ 
                var buttons = {
                text:"Shall we start?", 
                title1:"I want to know more", 
                payload1:"Get info", 
                title2:"Yes", 
                payload2:"Plate number"
                }
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
                    sender.state = 'I want to apply';
                    return sender;
                 })
                .then((sender)=>{
                    db.findSave(sender);
                    return true;
                 }).catch((err)=>{
                    console.error(err)
                });
            }

            if (payload === 'Plate number') {
 
                sendText(sender, "Good. First, can you send me your motorcycle plate number?");
                sender.state = 'Plate number';
                db.findSave(sender);
                
            }

            
            if (payload === ('honda_dream' || 'honda_wave')) { //Need to add verification model/plate when more info availlable
                var buttons = {
                    text:"How would you describe the overall condition of your motorcycle?", 
                    title1:"Good condition", 
                    payload1:"good", 
                    title2:"Normal condition", 
                    payload2:"normal", 
                    title3:"Poor condition", 
                    payload3:"poor"}

                    var buttonReply = new fbMessage
                    .ButtonTemplate(buttons)
                    .compose();
                    sendMessage(sender.fbid, buttonReply);
                    sender.motorcycle_model = payload;
                    sender.state = 'Get motorcycle model';
                    db.findSave(sender);

            }
            if ((payload === 'good') || (payload === 'normal')) {
                var buttons = {
                    text:"Ok, this looks good! Based on the information you gave me, you can borrow up to 1,500 USD from Barang Ktchey Microfinance! Should we continue?", 
                    title1:"Yes", 
                    payload1:"Term", 
                    title2:"I need less money", 
                    payload2:"Less", 
                    title3:"I need more money", 
                    payload3:"More"}

                     var buttonReply = new fbMessage
                    .ButtonTemplate(buttons)
                    .compose();
                    sendMessage(sender.fbid, buttonReply);
                    sender.motorcycle_condition = payload;
                    sender.state = 'Get motorcycle condition';
                    db.findSave(sender);

            }

            if (payload === 'poor') { // Prepare a fonction for value calculation when formula ready
                var buttons = {
                    text:"Sorry bong, but your motorcycle is too old to serve as a loan collateral. If you have another motorcycle registered under your name, you can startover the application again. If not, I am sorry we cannot proceed further", 
                    title1:"Stop application", 
                    payload1:"abort" 
                    }

                     var buttonReply = new fbMessage
                    .ButtonTemplate(buttons)
                    .compose();
                    sendMessage(sender.fbid, buttonReply);
                    sender.motorcycle_condition = payload;
                    sender.state = 'Get motorcycle condition';
                    db.findSave(sender);
            }


            if (payload === 'Less') {
                sendText(sender, "Please enter the amount you would like to borrow");
                sender.state = 'Less';
                db.findSave(sender);

            }

            if (payload === 'More') {
                var buttons = {
                    text:"Sorry, based on your motorcycle, we cannot provide you more than 1,500 USD. Do you want to continue your application for 1,500 USD?", 
                    title1:"Yes continue", 
                    payload1:"Term", 
                    title2:"Stop application", 
                    payload2:"Abort"}

                     var buttonReply = new fbMessage
                    .ButtonTemplate(buttons)
                    .compose();
                    sendMessage(sender.fbid, buttonReply);
                    sender.state = 'More';
                    db.findSave(sender);

            }

            if (payload === 'Proceed to loan') {
                
                var buttons = {
                    text:"Ok, this looks good! Based on the information you gave me, you can borrow up to 1,500 USD from Barang Ktchey Microfinance! Should we continue?", 
                    title1:"Yes", 
                    payload1:"Proceed to loan", 
                    title2:"I need less money", 
                    payload2:"Less", 
                    title3:"I need more money", 
                    payload3:"More"}

                     var buttonReply = new fbMessage
                    .ButtonTemplate(buttons)
                    .compose();
                    sendMessage(sender.fbid, buttonReply);
                    sender.motorcycle_condition = payload;
                    sender.state = 'Get motorcycle condition';
                    db.findSave(sender);

            }

            if (payload === 'Term') {
                var buttons = {
                    text:"So I understand you want a loan amounting to 1,500 USD. Now tell me, how long would you like the loan for?", 
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
                    sender.loan_amount = 1500;
                    sender.state = 'Term';
                    db.findSave(sender);

            }

            if (payload === '6 months') {
                var buttons = {
                    text:"Ok ok. Then if you want 1,500 USD over 6 month, that means you would pay a total of 138 USD total interest including all fees", 
                    title1:"Continue", 
                    payload1:"Installment 6 months", 
                    title2:"Change terms", 
                    payload2:"Term"}

                     var buttonReply = new fbMessage
                    .ButtonTemplate(buttons)
                    .compose();
                    sendMessage(sender.fbid, buttonReply);
                    sender.state = '6 months';
                    db.findSave(sender);

            }

            if (payload === '12 months') {
                var buttons = {
                    text:"Ok ok. Then if you want 1,500 USD over 12 month, that means you would pay a total of 246 USD total interest including all fees", 
                    title1:"Continue", 
                    payload1:"Installment 12 months", 
                    title2:"Change terms", 
                    payload2:"Term"}

                     var buttonReply = new fbMessage
                    .ButtonTemplate(buttons)
                    .compose();
                    sendMessage(sender.fbid, buttonReply);
                    sender.state = '12 months';
                    db.findSave(sender);

            }

            if (payload === '24 months') {
                var buttons = {
                    text:"Ok ok. Then if you want 1,500 USD over 24 month, that means you would pay a total of 462 USD total interest including all fees", 
                    title1:"Continue", 
                    payload1:"Installment 24 months", 
                    title2:"Change terms", 
                    payload2:"Term"}

                     var buttonReply = new fbMessage
                    .ButtonTemplate(buttons)
                    .compose();
                    sendMessage(sender.fbid, buttonReply);
                    sender.state = '24 months';
                    db.findSave(sender);

            }

            if (payload === 'Installment 6 months') {

                 var promise = new Promise(function(resolve, reject) {
                 resolve(sendText(sender, "In order to get the loan, you will have to pay 30 USD first", 1000))});

                var send = promise
                .then(sendText(sender, "Then, you will pay a monthly installment of 268 USD", 2000))
                .then(()=>{ 
                var buttons = {
                    text:"So total payment will be 1,638 USD for this loan", 
                    title1:"Continue", 
                    payload1:"Installment validation 6 months", 
                    title2:"Change terms", 
                    payload2:"Term"}
                return buttons;
                })
                .then((result)=>{
                    var buttonReply = new fbMessage
                .ButtonTemplate(result)
                .compose();
                setTimeout(function() {
                    sendMessage(sender.fbid, buttonReply);
                    }, 3000)
                return true;
                 })
                .then(()=>{
                    sender.state = 'Installment 6 months';
                    return sender;
                 })
                .then((sender)=>{
                    db.findSave(sender);
                    return true;
                 }).catch((err)=>{
                    console.error(err)
                });

            }

            if (payload === 'Installment 12 months') {
                

                var promise = new Promise(function(resolve, reject) {
                resolve(sendText(sender, "In order to get the loan, you will have to pay 30 USD first", 1000))});

                var send = promise
                .then(sendText(sender, "Then, you will pay a monthly installment of 143 USD", 2000))
                .then(()=>{ 
                var buttons = {
                    text:"So total payment will be 1,746 USD for this loan", 
                    title1:"Continue", 
                    payload1:"Installment validation 12 months", 
                    title2:"Change terms", 
                    payload2:"Term"}
                return buttons;
                })
                .then((result)=>{
                    var buttonReply = new fbMessage
                .ButtonTemplate(result)
                .compose();
                setTimeout(function() {
                    sendMessage(sender.fbid, buttonReply);
                    }, 3000)
                return true;
                 })
                .then(()=>{
                    sender.state = 'Installment 12 months';
                    return sender;
                 })
                .then((sender)=>{
                    db.findSave(sender);
                    return true;
                 }).catch((err)=>{
                    console.error(err)
                });

            }

            if (payload === 'Installment 24 months') {
                

                var promise = new Promise(function(resolve, reject) {
                resolve(sendText(sender, "In order to get the loan, you will have to pay 30 USD first", 1000))});

                var send = promise
                .then(sendText(sender, "Then, you will pay a monthly installment of 80,5 USD", 2000))
                .then(()=>{ 
                var buttons = {
                    text:"Ok ok. Then if you want 1,500 USD over 24 month, that means you would pay a total of 462 USD total interest including all fees", 
                    title1:"Continue", 
                    payload1:"Installment validation 24 months", 
                    title2:"Change terms", 
                    payload2:"Term"}
                return buttons;
                })
                .then((result)=>{
                    var buttonReply = new fbMessage
                .ButtonTemplate(result)
                .compose();
                setTimeout(function() {
                    sendMessage(sender.fbid, buttonReply);
                    }, 3000)
                return true;
                 })
                .then(()=>{
                    sender.state = 'Installment 24 months';
                    return sender;
                 })
                .then((sender)=>{
                    db.findSave(sender);
                    return true;
                 }).catch((err)=>{
                    console.error(err)
                });
            }

            if ((payload === 'Installment validation 6 months') || (payload === 'Installment validation 12 months') || (payload === 'Installment validation 24 months')) {
                
                if(payload === 'Installment validation 6 months'){
                    sender.installment = 6;
                }else if(payload === 'Installment validation 12 months'){
                    sender.installment = 12;
                }else if(payload === 'Installment validation 24 months'){
                    sender.installment = 24;
                }


                var promise = new Promise(function(resolve, reject) {
                resolve(sendText(sender, "Great! Let's continue this conversation", 1000))});

                var send = promise
                .then(sendText(sender, "By the way, I didn't ask your name!", 2000))
                .then(()=>{ 

                var buttons = {
                    text:`Is your name ${sender.first_name}`, 
                    title1:"Yes", 
                    payload1:"Valid_name", 
                    title2:"No", 
                    payload2:"Invalid_name"}
                return buttons;
                })
                .then((result)=>{
                    var buttonReply = new fbMessage
                .ButtonTemplate(result)
                .compose();
                setTimeout(function() {
                    sendMessage(sender.fbid, buttonReply);
                    }, 3000)
                return true;
                 })
                .then(()=>{
                    sender.state = 'Name_validation';
                    return sender;
                 })
                .then((sender)=>{
                    db.findSave(sender);
                    return true;
                 }).catch((err)=>{
                    console.error(err)
                });

            }

            if (payload === 'Valid_name') { //add a function that compares name to plate registration when info availlable

                sendText(sender, `How old are you ${sender.first_name} ?`, 1000)
                sender.name = sender.first_name;
                sender.state = 'Valid_name';
                db.findSave(sender);

            }

            if (payload === 'Invalid_name') {

            }

            if ((payload === 'Married') || (payload === 'Single') || (payload === 'Widow')) {
                
                if(payload === 'Married'){
                    sender.situation = 'Married';
                }else if(payload === 'Single'){
                    sender.situation = 'Single';
                }else if(payload === 'Widow'){
                    sender.situation = 'Widow';
                }

                var buttons = {
                    text:'Do you have children?', 
                    title1:"Yes", 
                    payload1:"With_children", 
                    title2:"No", 
                    payload2:"Without_children"}

                var buttonReply = new fbMessage
                .ButtonTemplate(buttons)
                .compose();
                sendMessage(sender.fbid, buttonReply);
                sender.state = 'Children';
                db.findSave(sender);

            }

            if ((payload === 'With_children') || (payload === 'Without_children')) {
                
                if(payload === 'With_children'){
                    sender.children = true;
                    var buttons = {
                    text:'How many children do you have?', 
                    title1:"1 or 2 children", 
                    payload1:"1 or 2 children", 
                    title2:"3 or 4 children", 
                    payload2:"3 or 4 children",
                    title3:"5 or 6 children", 
                    payload3:"5 or 6 children"}

                var buttonReply = new fbMessage
                .ButtonTemplate(buttons)
                .compose();
                sendMessage(sender.fbid, buttonReply);
                }else if(payload === 'Without_children'){
                    sender.children = false;
                    var buttons = {
                    text:'Where do you live?', 
                    title1:"With parents", 
                    payload1:"With parents", 
                    title2:"Alone", 
                    payload2:"Alone",
                    title3:"With relatives", 
                    payload3:"With relatives"}

                var buttonReply = new fbMessage
                .ButtonTemplate(buttons)
                .compose();
                sendMessage(sender.fbid, buttonReply);
                }

                sender.state = 'Children';
                db.findSave(sender);

            }

            if ((payload === '1 or 2 children') || (payload === '3 or 4 children') || (payload === '5 or 6 children')) {
                
                if(payload === '1 or 2 children'){
                    sender.children_nb = 1.5;
                }else if(payload === '3 or 4 children'){
                    sender.children_nb = 3.5;
                }else if(payload === '5 or 6 children'){
                    sender.children_nb = 5.5;
                }

                var buttons = {
                    text:'How many children earn their lives?', 
                    title1:"1", 
                    payload1:"1 working_children", 
                    title2:"2", 
                    payload2:"2 working_children",
                    title3:"3 or more", 
                    payload3:"3+ working_children"}

                var buttonReply = new fbMessage
                .ButtonTemplate(buttons)
                .compose();
                sendMessage(sender.fbid, buttonReply);
                sender.state = 'Working children';
                db.findSave(sender);

            }

            if ((payload === '1 working_children') || (payload === '2 working_children') || (payload === '3+ working_children')) {
                
                if(payload === '1 working_children'){
                    sender.children_working = 1;
                }else if(payload === '2 working_children'){
                    sender.children_working = 2;
                }else if(payload === '3+ working_children'){
                    sender.children_working = "3 +";
                }

                var buttons = {
                    text:'Where do you live?', 
                    title1:"With wife and children", 
                    payload1:"With wife and children", 
                    title2:"Alone", 
                    payload2:"Alone",
                    title3:"With relatives", 
                    payload3:"With relatives"}

                var buttonReply = new fbMessage
                .ButtonTemplate(buttons)
                .compose();
                sendMessage(sender.fbid, buttonReply);
                sender.state = 'Working children number';
                db.findSave(sender);
            }

            //ADD FONCTION FOR CHILDREN NOT WORKING

            if ((payload === 'With wife and children') || (payload === 'Alone') || (payload === 'With relatives') || (payload === 'With parents')) {
                
                if(payload === 'With wife and children'){
                    sender.housing = 'With wife and children';
                }else if(payload === 'Alone'){
                    sender.housing = 'Alone';
                }else if(payload === 'With relatives'){
                    sender.housing = 'With relatives';
                }else if(payload === 'With parents'){
                    sender.housing = 'With parents';
                }

                var buttons = {
                    text:'And by the way, where are you now?', 
                    title1:"Home", 
                    payload1:"Home", 
                    title2:"Work", 
                    payload2:"Work",
                    title3:"Somewhere else", 
                    payload3:"Somewhere else"}

                var buttonReply = new fbMessage
                .ButtonTemplate(buttons)
                .compose();
                sendMessage(sender.fbid, buttonReply);
                sender.state = 'Housing';
                db.findSave(sender);
            }

            if (payload === 'Somewhere else') {
                
                var promise = new Promise(function(resolve, reject) {
                resolve(sendText(sender, "I need you to be at home or at work to continue this application", 1000))});

                var send = promise
                .then(()=>{ 

                var buttons = {
                    text:`Is your name ${sender.first_name}`, 
                    title1:"At home already", 
                    payload1:"Home", 
                    title2:"At work already", 
                    payload2:"Work"}
                return buttons;
                })
                .then((result)=>{
                    var buttonReply = new fbMessage
                .ButtonTemplate(result)
                .compose();
                setTimeout(function() {
                    sendMessage(sender.fbid, buttonReply);
                    }, 2000)
                return true;
                 })
                .then(()=>{
                    sender.state = 'Is somewhere else';
                    return sender;
                 })
                .then((sender)=>{
                    db.findSave(sender);
                    return true;
                 }).catch((err)=>{
                    console.error(err)
                });
            }

            if (payload === 'Work') {

                sendTextMessage(sender, 'Ok, can you please let me know where is your work?');
                sender.state = 'At work';
                db.findSave(sender);
                sendLocationMessage(sender)

            }

            
            /* Anciennes cartes
            if (payload === 'Proceed to loan') {
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
            */
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

        function sendLocationMessage(sender) {
            messageData = {
                    "text":"Just click the button below to let me know!",
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
}