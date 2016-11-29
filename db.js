var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var MONGOLAB_URI = 'login:password@ds151707.mlab.com:51707';//a virer
var uristring= 'mongodb://'+MONGOLAB_URI+'/heroku_x563fr8q';
var url = uristring;

module.exports = {};

//Simple mongodb database promisified in order to work queries for messenger

//Cut open and close database function for flexibility
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


module.exports.findfbidtest = function (user){
    return new Promise(function(resolve, reject) {

  MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {

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


// Combination of query and save in promise form, saves or updates if founduser
module.exports.findSave = function (object) {

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
