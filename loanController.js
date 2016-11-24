module.exports = {};

function amountFind (str){


	var regex = /\d+/g;
	var matches = str.match(regex);
	if (matches[1])
		return false;
	if(matches[0])
		return matches[0]
	else
		return false;

}

module.exports.loanFind = function (str){

	var loan = amountFind(str);
	console.log(loan);
	if ((loan) && (loan > 500) && (loan < 1500))
		return loan;
	else 
		return false;
}

module.exports.amountParse = function (str){

	var amount = amountFind(str);
	console.log(amount);
	if (amount)
		return amount;
	else 
		return false;
}