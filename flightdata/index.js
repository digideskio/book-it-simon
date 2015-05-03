var utils = require('../utils/functions')


module.exports = {
	getSample: function(req, res, next){
		var payload = {
			departureFlight: {
				origin: "DCA",
		        destination: "SEA",
		        date: "2015-05-08",
		        permittedDepartureTime: {
		          earliestTime: "10:00",
		          latestTime: "12:00"
		        }
			},
			returnFlight: {
				origin: "SEA",
		        destination: "DCA",
		        date: "2015-05-21",
		        permittedDepartureTime: {
		          earliestTime: "10:00",
		          latestTime: "12:00"
		        }
			},
			passengers: {
				adult: 1
			},
			solutions: 10,
			maxPrice: "USD1000.00",
			refundable: false
		};

		res.json(payload);
	},
	search: function(req, res, next){
		var body = utils.trimBody(req.body);
		res.json();
	}

}

