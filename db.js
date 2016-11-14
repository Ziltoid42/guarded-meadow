//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
module.exports = function () {//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
var MONGOLAB_URI = 'greg:1186sousou@ds151707.mlab.com:51707';
var uristring= 'mongodb://'+MONGOLAB_URI+'/heroku_x563fr8q';
// Connection URL. This is where your mongodb server is running.
var url = uristring;

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // do some work here with the database.

    //Close connection
    db.close();
  }
});