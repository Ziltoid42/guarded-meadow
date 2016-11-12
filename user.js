function user(name, id){

   // Add object properties like this
   this.name = name;
   this.id = id;
}

user.prototype.user = function(){};

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
