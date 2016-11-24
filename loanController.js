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
	if ((loan) && (loan > 500) && (loan < 1500))
		return loan;
	else 
		return false;
}