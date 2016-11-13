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


/*
  Lets define our Model for User entity. This model represents a collection in the database.
  We define the possible schema of User document and data types of each field.
  */
var userSchema = new Schema({
  name: String,
  fbid: Number,
  state: String
});

var user = mongoose.model('User', userSchema);
//function user(){
   // Add object properties like this

   //this.data = db.mongoose.model('User', {name: String, fbid: Number});
    
//}

user.prototype = {


    initUser : function (name, fbid) {
      this.name = name;
      this.fbid = fbid;
    }

};

user.prototype.showData = function () { console.log(this.name, this.fbid); };

module.exports = user;

/* pour l'instant on met de coté
var user = Object.create(user);
// Initialisation de l'utilisateur
user.initUser = function (nom, id) {
    this.initUser(nom, id);
    this.id = id;
    this.nom = "gregoire";
};
// Renvoie la description de l'utilisateur
user.decrire = function () {
    var description = 
    "nom: " + this.nom + " " + 
    "facebook id " + this.id + " " +
    "étape de conversation " + this.state + " " /*+
    "" + this. + " " +
    "" + this. + " " +
    "" + this. + " " +
    "" + this. + " " +
    "" + this. + " " +
    "" + this. + " " +
    "" + this. + " " +
    "" + this. + " " +
    "" + this. + " " +
    "" + this. + " " +
    "" + this. + " " +
    "" + this. + " " +
    "" + this. + " " +
    "" + this. + " " +
    "" + this. + " " +
    "" + this. + " " +
    "" + this. + " " +
    "" + this. + " " +
    "" + this. + " " +
    "" + this. + " " +
    "" + this. + " " + 
    ;
    return description;
};*/


/* //Activate by installing messenger-bot

 function getUserProfile(sender) {
    const url = 'https://graph.facebook.com/v2.6/${sender}?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${token}';
    return fetch(url)
      .then(res => res.json())
      .catch(err => console.log(`Error getting user profile: ${err}`));
  }
  
//test output user
if (event.message.text === 'id') {
            sendTextMessage(sender, toString(event.sender.id));
            continue
            
        }
   
var user = getUserProfile(sender).then(info);*/





// No real need of sessions yet maybet later for performances
/*
user.prototype.user = function(){};
const sessions = {};
user.prototype.findOrCreateSession = function(fbid){
    var sessionId;
    // Let's see if we already have a session for the user fbid
    Object.keys(sessions).forEach(k => {
      if (sessions[k].fbid === fbid) {
         // Yep, got it!
         sessionId = k;
      }
    });
    if (!sessionId) {
      // No session found for user fbid, let's create a new one
      sessionId = new Date().toISOString();
      sessions[sessionId] = {fbid: fbid, context: {}};
    }

    return sessionId;
}  */
/*
var sender = new user("Greg", 12345);
//initier une session
const sessionId = sender.findOrCreateSession(sender.fbid);
var session = sessions[sessionId];
session.context.name = sender.name;
session.context.bite = 23;
console.log(session);*/
/*
function findOrCreateSession (fbid){
    var sessionId;
    // Let's see if we already have a session for the user fbid
    Object.keys(sessions).forEach(k => {
      if (sessions[k].fbid === fbid) {
         // Yep, got it!
         sessionId = k;
      }
    });
    if (!sessionId) {
      // No session found for user fbid, let's create a new one
      sessionId = new Date().toISOString();
      sessions[sessionId] = {fbid: fbid, context: {}};
    }
    return sessionId;
}  
const sessionId = findOrCreateSession(payload.sender.id)
var session = sessions[sessionId]
session.context.yourfield = 10
*/



/*
infos facebook:
-facebook_user_id  (int)
-facebook_user_token?(varchar)
-facebook_profile_pic (varchar)
-facebook_name (varchar)
-flow state (int)

infos bot:
-nom validé (varchar)
-phone number (int)
-plate_number (int)  this.plate = platenb;// numéro plaque de moto
-moto_model (varchar) this.moto_model =
-moto_condition (tinyint) this.moto_condition = 
-age_valide (int) this.age = 
-marital situation (tinyint) this.married =
-nb_children (int) this.nb_children =
-children who work (int)
-is_at_home (tinyint)
-lives_at(home/parents/friends/relative) (tinyint)
-Adress_confirmed (a braekdown en [nom, ville, street, numéro, geoloc]) 
-Owned house or rent (tinyint)
-How long living home (datetime? nombre de mois?)
-Home documents (reception de fichiers images)
-Salary or business owner (tinyint)

salary: 
-salary (int)
-allowances (int)
-work frequency (diiférentiation entre [full time, part time, saisonnier]  (tinyint)
-send documents (reception de fichiers images)

business owner:
-revenu (int)
-expenses (int)
-net income confirmed (int)
-send documents (reception de fichiers images)

infos: loan
-Amount asked (int)
-Amount possible? (int)
-loan duration (datetime)
*/
