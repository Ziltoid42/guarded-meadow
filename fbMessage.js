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


function composeMessage () {
    return function () {
        return this.message;
    }
}



module.exports = {};


/***************************************
 * Plain text message
 ***************************************/

 /* Example output:
    {
        "text":"hello, world!"
    } 

  */

module.exports.PlainText = function (text) {
    var self = this;

    if (!text) { 
        throw Error('No message text provided');
    } 

    self.message = {
        text : text
    };

    self.compose = composeMessage();


    return self;
};



/***************************************
 * Image message
 ***************************************/

/* Example output: 
    {
        "attachment":{
          "type":"image",
          "payload":{
            "url":"https://petersapparel.com/img/shirt.png"
          }
        }
    }

*/
module.exports.Image = function (imageUrl) {
    var self = this;

    if (!imageUrl) { 
        throw Error('No image url provided');
    } 

    self.message = {
        "attachment":{
            "type":"image",
            "payload":{
                "url": imageUrl
            }
        }
    };

    self.compose = composeMessage();

};




/***************************************
 * Button template
 ***************************************/

/* Example output: 

  {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"What do you want to do next?",
        "buttons":[
          {
            "type":"web_url",
            "url":"https://petersapparel.parseapp.com",
            "title":"Show Website"
          },
          {
            "type":"postback",
            "title":"Start Chatting",
            "payload":"USER_DEFINED_PAYLOAD"
          }
        ]
      }
    }
  }

*/
module.exports.ButtonTemplate = function (buttons) {
    var self = this;
    
    if (!buttons.text) { 
        throw Error('No template title provided');
    } 

 if(buttons.payload1 && !(buttons.payload2) && !(buttons.payload3)){
     self.message =  {
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
          }
           ]
         }
       }
     };
    }

    if(buttons.payload1 && buttons.payload2 && !(buttons.payload3)){
     self.message =  {
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
     };
    }

    if(buttons.payload1 && buttons.payload2 && buttons.payload3){

    self.message =  {

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
  };
}

 /*
     self.addButton = function (buttonConfig) {

        if (self.message.attachment.payload.buttons.length <= 2) {
            self.message.attachment.payload.buttons.push(buttonConfig);
        } else {
            console.warn('Can\'t add more than 3 buttons to ButtonTemplate');
        }

        

        return self;
     };
*/
    self.compose = function () {

        //if (self.message.attachment.payload.buttons.length === 0) {
          //  throw Error('You have to add at least 1 button to ButtonTemplate message');
       // }


        return self.message;
    };

};




/***************************************
 * Generic template
 ***************************************/

/* Example output: 

  {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"generic",
        "elements":[
          {
            "title":"Classic White T-Shirt",
            "image_url":"http://petersapparel.parseapp.com/img/item100-thumb.png",
            "subtitle":"Soft white cotton t-shirt is back in style",
            "buttons":[
              {
                "type":"web_url",
                "url":"https://petersapparel.parseapp.com/view_item?item_id=100",
                "title":"View Item"
              },
              {
                "type":"web_url",
                "url":"https://petersapparel.parseapp.com/buy_item?item_id=100",
                "title":"Buy Item"
              },
              {
                "type":"postback",
                "title":"Bookmark Item",
                "payload":"USER_DEFINED_PAYLOAD_FOR_ITEM100"
              }              
            ]
          },
          {
            "title":"Classic Grey T-Shirt",
            "image_url":"http://petersapparel.parseapp.com/img/item101-thumb.png",
            "subtitle":"Soft gray cotton t-shirt is back in style",
            "buttons":[
              {
                "type":"web_url",
                "url":"https://petersapparel.parseapp.com/view_item?item_id=101",
                "title":"View Item"
              },
              {
                "type":"web_url",
                "url":"https://petersapparel.parseapp.com/buy_item?item_id=101",
                "title":"Buy Item"
              },
              {
                "type":"postback",
                "title":"Bookmark Item",
                "payload":"USER_DEFINED_PAYLOAD_FOR_ITEM101"
              }              
            ]
          }
        ]
      }
    }
  }

*/
module.exports.GenericTemplate = function () {
    var self = this;

    self.message = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": []
            }
        }
    };


    self.addElement = function (elementConfig) {

        elementConfig.buttons = [];

        if (self.message.attachment.payload.elements.length < 10) {
            self.message.attachment.payload.elements.push(elementConfig);
        } else {
            console.warn('Can\'t add more than 10 elements to a GenericTemplate');
        }

        return self;
    };


    self.addButton = function (buttonConfig) {

        if (self.message.attachment.payload.elements.length === 0) {
            throw Error('You have to add at least 1 element first to add buttons to it');
        }

        var lastElementId = self.message.attachment.payload.elements.length - 1;

        if (self.message.attachment.payload.elements[lastElementId].buttons.length <= 2) {
            self.message.attachment.payload.elements[lastElementId].buttons.push(buttonConfig);
        } else {
            console.warn('Can\'t add more than 3 buttons to element #' + lastElementId);
        }

        return self;
    };





    self.compose = function () {

        if (self.message.attachment.payload.elements.length === 0) {
            throw Error('You have to add at least 1 element to GenericTemplate message');
        }
        return self.message;
    };


};


