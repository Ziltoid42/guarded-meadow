
module.exports = {};

module.exports.ageFind = function (str){

	str = str.replace(/\s+/g, '');
	str = str.toUpperCase(str);
	var strFilter = /^\d{1}$/;
	var i = 0;
	while (str[i]){

		if (!strFilter.test(str[i])) {
    		i++;
    	}
    	else{
		var age = str.slice(i, i+2);
    		if((age > 20) && (age < 58))
		return age;
			else
				i++;
    	}
			
	}
	return false;
}



//debug("Sorry, you must be at least 20 years old to apply");
//debug("Sorry, you must be at less than 60 years old to apply");