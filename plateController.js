
module.exports = function () {




function plateFind(str){

	str = str.replace(/\s+/g, '');
	str = str.toUpperCase(str);
	var strFilter = /^\d{1}$/;
	var i = 0;
	while (str[i]){

		if (!strFilter.test(str[i])) {
    		i++;
    	}
    	else{
		var plate = str.slice(i, i+7);
    		if(regexPlateCheck (plate))
		return plate;
			else
				i++;
    	}
			
	}
}

function regexPlateCheck (plate){
	var strFilter = /^\d{1}[A-Z]{2}\d{4}$/;
	if (!strFilter.test(plate)) {
    	console.log("Please enter valid 6 digit license plate.");
    return false;
	}
	else{
		return true;
	}
}
}

valid_plate = plateFind(valid_str);
console.log(valid_plate);