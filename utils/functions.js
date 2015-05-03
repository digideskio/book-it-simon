function trimBody(body){
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


exports.trimBody = trimBody;