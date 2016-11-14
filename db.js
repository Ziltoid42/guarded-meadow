//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
//db = (function () {//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
var MONGOLAB_URI = 'greg:1186sousou@ds151707.mlab.com:51707';
var uristring= 'mongodb://'+MONGOLAB_URI+'/heroku_x563fr8q';
// Connection URL. This is where your mongodb server is running.
var url = uristring;

module.exports = {};

module.exports.lol = function () {

   console.log("prout");
}



module.exports.save = function (user) {

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // Get the documents collection
    var collection = db.collection('users');

    // Insert some users
    collection.insert([user], function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
      }
      //Close connection
      db.close();
    });
  }
});
}

//
module.exports.findfbid = function (user) {
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // Get the documents collection
    var collection = db.collection('users');

    // Insert some users
    collection.find({fbid: user.fbid}).toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
        return result;
      } else {
        console.log('No document(s) found with defined "find" criteria!');
      }
      //Close connection
      db.close();
    });
  }
});
}
//
//fin export