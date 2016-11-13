module.exports = function () {
//Lets load the mongoose module in our program
var mongoose = require('mongoose');
console.log("passe par db");
//Lets connect to our database using the DB server URL.
var MONGOLAB_URI = 'greg:1186sousou@ds151707.mlab.com:51707';
var uristring= 'mongodb://'+MONGOLAB_URI+'/heroku_x563fr8q';

var theport = process.env.PORT  || 5000;

mongoose.connect(uristring, function(err,res){
        if (err) {
                console.log('ERROR connecting to: '+uristring+'. ' + err)
        }
        else {
                console.log('Succeeded connected to: '+uristring);
        }
});
var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'Database connection error, fcukkk:'));
conn.once('open', function callback() {console.log("sup stud, Database connected.")});

module.exports = db;
};
/*
  Lets define our Model for User entity. This model represents a collection in the database.
  We define the possible schema of User document and data types of each field.
  */


var User = mongoose.model('User', {name: String, roles: Array, age: Number});


  Lets Use our Models
 

//Lets create a new user
var user1 = new User({name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']});

//Some modifications in user object
user1.name = user1.name.toUpperCase();

//Lets try to print and see it. You will see _id is assigned.
console.log(user1);

//Lets save it
user1.save(function (err, userObj) {
  if (err) {
    console.log(err);
  } else {
    console.log('saved successfully:', userObj);
  }
});

//Lets try to Find a user
User.findOne({name: 'modulus admin'}, function (err, userObj) {
  if (err) {
    console.log(err);
  } else if (userObj) {
    console.log('Found:', userObj);

    //For demo purposes lets update the user on condition.
    if (userObj.age != 30) {
      //Some demo manipulation
      userObj.age += 30;

      //Lets save it
      userObj.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Updated', userObj);
        }
      });
    }
  } else {
    console.log('User not found!');
  }
});

*/