//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
//db = (function () {//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
var MONGOLAB_URI = 'greg:1186sousou@ds151707.mlab.com:51707';
var uristring= 'mongodb://'+MONGOLAB_URI+'/heroku_x563fr8q';
// Connection URL. This is where your mongodb server is running.
var url = uristring;

module.exports = {};

function open(){

    // Connection URL. This is where your mongodb server is running.
    
    return new Promise((resolve, reject)=>{
        // Use connect method to connect to the Server
        MongoClient.connect(url, (err, db) => {
            if (err) {
                reject(err);
            } else {
                resolve(db);
            }
        });
    });
}

function close(db){
    //Close connection
    if(db){
        db.close();
    }
}

var db = {
    open : open,
    close: close
}


//test
//var user = {name: 'gregoun', fbid: 2132};
module.exports.findfbidtest = function (user){
    return new Promise(function(resolve, reject) {
  //resolve(findtest(user));
  MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        //HURRAY!! We are connected. :)
        //console.log('Connection established to', url);

        // Get the documents collection
        var collection = db.collection('users');
        // Get one user by fbid
        collection.findOne({fbid: user.fbid}, function (err, result){
          if (err) {
            reject(err);
          } if (result) {
            //console.log('Dans findfbid:', result);
            resolve(result);
          } else {
            //console.log('No document(s) found with defined "find" criteria!', result);
            resolve(user);
          }
         
          //Close connection
          db.close();

        });
      }
    }); 
})
}
/*
// Debut version qui marche
module.exports.findfbidtest = function (user){
    return new Promise(function(resolve, reject) {
  //resolve(findtest(user));
  MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        //HURRAY!! We are connected. :)
        console.log('Connection established to', url);

        // Get the documents collection
        var collection = db.collection('users');
        // Get one user by fbid
        resolve(collection.findOne({fbid: user.fbid}));
         
          //Close connection
          db.close();

        };
      })
    }); 
}
*/ //fin version qui marche


/*
// Debut version qui marche
var promise = new Promise(function(resolve, reject) {
  //resolve(findtest(user));
  MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        //HURRAY!! We are connected. :)
        console.log('Connection established to', url);

        // Get the documents collection
        var collection = db.collection('users');
        // Get one user by fbid
        resolve(collection.findOne({fbid: user.fbid}));
         
          //Close connection
          db.close();

        };
      })
    }); 
    //fin version qui marche
*/
/*
// debut Version qui marche
var promise = new Promise(function(resolve, reject) {
  //resolve(findtest(user));
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
            reject(err);
          } else if (result.length) {
            //console.log('Dans findfbid:', result);
          } else {
            console.log('No document(s) found with defined "find" criteria!');
          }
          //Close connection
          db.close();
          resolve (result);
          
            });
          //return copy; //.toArray(function(err, items){
          //return items;
            //})
        };
      })
    }); 
// fin Version qui marche
*/

//Appel qui marche
/*
var founduser = promise
.then((result)=>{
  console.log("dans then de promise: ", result);
  founduser = result; // 1
  return founduser; 
}).catch((err)=>{
        console.error(err)
    });
console.log("hors de la promise promise: ", founduser);
//fin appel qui marche
*/


//fin test
module.exports.findSave = function (object) {
//function insert(object){
    object.name = 'julien';
    object.prout = 'caca';
    var database = null;
    open()
    .then((db)=>{
        database = db;
        return db.collection('users')    
    })
    .then((users)=>{
        return users.findOne({fbid: object.fbid})
    })
    .then((result)=>{
        if(result){
            update(object);
            //users.update({fbid: object.fbid}, {object});
            console.log("updaté");
        }else{
            save(object);
            console.log("sauvé");
        }
        database.close();
        return true;
    })
    .catch((err)=>{
        console.error(err)
    })
    
}

function save (object) {
//function insert(object){
    var database = null;
    var user = object;
    open()
    .then((db)=>{
        database = db;
        return db.collection('users')    
    })
    .then((users)=>{
        return users.save(user);
    })
    .then((result)=>{
        //console.log(result);
        database.close();
    })
    .catch((err)=>{
        console.error(err)
    })
}

function update (object) {
//function insert(object){
    var database = null;
    open()
    .then((db)=>{
        database = db;
        return db.collection('users')    
    })
    .then((users)=>{
        return users.update({fbid: object.fbid}, object);
    })
    .then((result)=>{
        //console.log(result);
        database.close();
    })
    .catch((err)=>{
        console.error(err)
    })
}

//fin export