var utils = require('../utils/functions');
var debug = require('debug')('bookitsimon:flightdata');
var config = require("config");
var request = require('request');
var fs = require("fs");

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
		debug("Getting sample");
		res.json(payload);
	},
	search: function(req, res, next){
		var body = utils.trimBody(req.body);
		if(!utils.validateBody(body)){
			debug("Body not valid");
			res.json({
				error: true,
				message: "body is missing required fields. Check http://localhost:3000/sample for a sample payload."
			});
			return;
		}

		var requestData = {
			request: {
				slice: [
					{
						origin: body["departureFlight.origin"] ,
						destination: body["departureFlight.destination"],
						date: body["departureFlight.date"],
						preferredCabin: (body["departureFlight.preferredCabin"]) ? body["departureFlight.preferredCabin"] : "COACH",
						permittedDepartureTime: {
							earliestTime: (body["departureFlight.permittedDepartureTime"] && body["departureFlight.permittedDepartureTime.earliestTime"]) ? body["departureFlight.permittedDepartureTime.earliestTime"] : "10:00",
							latestTime: (body["departureFlight.latestTime"] && body["departureFlight.permittedDepartureTime.latestTime"]) ? body["departureFlight.permittedDepartureTime.latestTime"] : "12:00"
						}
					},
					{
						origin: body["returnFlight.origin"],
						destination: body["returnFlight.destination"],
						date: body["returnFlight.date"],
						preferredCabin: (body["returnFlight.preferredCabin"]) ? body["returnFlight.preferredCabin"] : "COACH",
						permittedDepartureTime: {
							earliestTime: (body["returnFlight.permittedDepartureTime"] && body["returnFlight.permittedDepartureTime.earliestTime"]) ? body["returnFlight.permittedDepartureTime.earliestTime"] : "10:00",
							latestTime: (body["returnFlight.latestTime"] && body["returnFlight.permittedDepartureTime.latestTime"]) ? body["returnFlight.permittedDepartureTime.latestTime"] : "12:00"
						}
					}
				],
			    passengers: {
			      adultCount: (body["passengers.adultCount"]) ? parseInt(body["passengers.adultCount"]) : 1,
			      infantInLapCount: 0,
			      infantInSeatCount: 0,
			      childCount: 0,
			      seniorCount: 0
			    },
			    solutions: (body["passengers.solutions"]) ? parseInt(body["passengers.solutions"]) : 2,
			    maxPrice: (body["passengers.maxPrice"]) ? body["passengers.maxPrice "]: "USD1000.00",
			    refundable: (body["passengers.refundable"]) ? Boolean(body["passengers.refundable"]) : false
			}
		}

		debug("request:", JSON.stringify(requestData));
		
		var options = {
			url: [config.googleApi.url, "?key=", config.googleApi.apiKey].join(""),
			body: requestData,
			headers: {
				"Content-Type": config.googleApi.contentType
			},
			json: true
		};

		/*request.post(options, function(err, response, body) {
		  	res.json(body);
		});*/

		var theData = JSON.parse(fs.readFileSync('./flightdata/flightdata-2.json'));
		var carriers = {}, cities = {}, trips = [], tripLeg = [];
		carriers[theData.trips.data.carrier.code] = theData.trips.data.carrier.name;
		cities[theData.trips.data.city.code] = theData.trips.data.city.name;
		theData.trips.tripOption.forEach(function(value, i){
			value.slice.forEach(function(segment, j){
				// TO do, parse this data
			});
			;
		});

		var results = [
			{
				carrier: "US",
				fare: "USD1000.00",
				origDep: "DCA",
				origFlightime: "11:25 am",
				origDest: "SEA",
				origDepTime: "05:03 pm",
				origDuration: "8h 38m",
				retDep: "DCA",
				retFlightime: "11:25 am",
				retDest: "SEA",
				retDepTime: "05:03 pm",
				retDuration: "8h 38m"
			},
			{
				carrier: "ASA",
				fare: "USD764.00",
				origDep: "DCA",
				origFlightime: "08:25 am",
				origDest: "SEA",
				origDepTime: "02:25 pm",
				origDuration: "5h 38m",
				retDep: "DCA",
				retFlightime: "2:27 pm",
				retDest: "SEA",
				retDepTime: "05:03 pm",
				retDuration: "4h 38m"
			}
		];
		res.render('flightdata', {
			flightdata: results
		});
	}

}

