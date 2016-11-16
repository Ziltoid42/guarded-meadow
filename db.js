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

module.exports.lol = function () {

   console.log("prout");
}

function getConnection(cb) {  
    MongoClient.connect(url, function(err, db) {
        if (err) return cb(err);
        var accounts = db.collection("users");
        cb(null, accounts);
    })
}    
// list all of the documents by passing an empty selector.
// This returns a 'cursor' which allows you to walk through the documents

function readAll(collection, cb) {  
   collection.find({}, cb);
}

function printAccount(account) {  
    // make sure you found your account!
    if (!account) {
        console.log("Couldn't find the account you asked for!");
    }
    console.log("Account from Array "+ account);
}

// the each method allows you to walk through the result set, 
// notice the callback, as every time the callback
// is called, there is another chance of an error
function printAccounts(accounts, cb) {  
    accounts.each(function(err, account) {
        if (err) return cb(err);
        printAccount(account);
    });
}

function get_accounts(cb) {  
    getConnection(function(err, collection) {
        if (err) return cb(err);    
        // need to make sure to close the database, otherwise the process
        // won't stop
        function processAccounts(err, accounts) {
            if (err) return cb(err);
            // the callback to each is called for every result, 
            // once it returns a null, you know
            // the result set is done
            accounts.each(function(err, account) {
                if (err) return cb(err)  
                if (hero) {  
                    printAccount(account);
                } else {
                    collection.db.close();
                    cb();
                }
            })
        }
        readAll(collection, processAccounts);        
    })
}

// Call the get_accounts function
get_accounts(function(err) {  
     if (err) {
         console.log("had an error!", err);
         process.exit(1);
     }
});

//fin test
module.exports.find = function (object) {
//function insert(object){

  console.log("dans find: ", object);
    var database = null;
    open()
    .then((db)=>{
        database = db;
        return db.collection('users')    
    })
    .then((users)=>{
        return users.findOne({fbid: object})
    })
    .then((result)=>{
        console.log("result: ", result);
        database.close();
        return result;
    })
    .catch((err)=>{
        console.error(err)
    })
    
}

module.exports.save = function (object) {
//function insert(object){
    var database = null;
    open()
    .then((db)=>{
        database = db;
        return db.collection('users')    
    })
    .then((users)=>{
        return users.insert([object])
    })
    .then((result)=>{
        console.log(result);
        database.close();
    })
    .catch((err)=>{
        console.error(err)
    })
}

module.exports.update = function (object) {
//function insert(object){
    var database = null;
    open()
    .then((db)=>{
        database = db;
        return db.collection('users')    
    })
    .then((users)=>{
        return users.update({fbid: object.fbid})
    })
    .then((result)=>{
        console.log(result);
        database.close();
    })
    .catch((err)=>{
        console.error(err)
    })
}

//fin export