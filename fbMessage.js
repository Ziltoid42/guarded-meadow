


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
module.exports.ButtonTemplate = function (title) {
    var self = this;
    
    if (!title) { 
        throw Error('No template title provided');
    } 

    self.message =  {
         "attachment": {
             "type": "template",
             "payload": {
                 "template_type": "button",
                 "text": title,
                 "buttons": []
             }
         }
     };

     self.addButton = function (buttonConfig) {

        if (self.message.attachment.payload.buttons.length <= 2) {
            self.message.attachment.payload.buttons.push(buttonConfig);
        } else {
            console.warn('Can\'t add more than 3 buttons to ButtonTemplate');
        }

        

        return self;
     };

    self.compose = function () {

        if (self.message.attachment.payload.buttons.length === 0) {
            throw Error('You have to add at least 1 button to ButtonTemplate message');
        }


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


