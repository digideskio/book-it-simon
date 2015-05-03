var debug = require('debug')('bookitsimon:functions');
function trimBody(body){
	debug("trimming body");
	var newBody = {};
	if (typeof body === 'object') {
		Object.keys(body).forEach(function (key){
			var value = body[key];

			if (typeof value === 'string'){
				return newBody[key] = value.trim();
			}

			if (typeof value === 'object'){
				trimBody(value);
			}
		});
	}
	return newBody;
}

function validateBody(data){
	if(	data && data["departureFlight.origin"] && data["departureFlight.destination"] && data["departureFlight.date"] && 
		data["returnFlight.origin"] && data["returnFlight.destination"] && data["returnFlight.date"] ){
			debug("validateBody passed");
			return true;
	}

	debug("validateBody failed");
	return false;
}

exports.trimBody = trimBody;
exports.validateBody = validateBody;