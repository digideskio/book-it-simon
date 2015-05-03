#Search API

Required Fields
All of the fields are of type strings
```
Field name                          Example
departureFlight.origin			  	DCA
departureFlight.destination 	    SEA
departureFlight.date			    2015-05-08
returnFlight.origin			     	SEA
returnFlight.destination		    DCA
returnFlight.date			 		2015-05-21
```


## Sample HTML
```
<form action="/search" method="post">
	<div>Departure</div>
	<label for="depOrig">Departure</label><input id="depOrig" name="departureFlight.origin" type="text" value="DCA"/>
	<label for="depDest">Departure</label><input id="depDest" name="departureFlight.destination" type="text" value="SEA"/>
	<label for="depDate">Departure</label><input id="depDate" name="departureFlight.date" type="text" value="2015-05-08"/>
	<label for="depCabin">Preferred Cabin</label>
	<select id="depCabin" name="departureFlight.preferredCabin">
		<options value="COACH" selected>Coach<option>
		<options value="BUSINESS">Business Class<option>
		<options value="FIRST">First Class<option>
	</select>
	

	<div>Return</div>
	<label for="retOrig">Departure</label><input id="retOrig" name="returnFlight.origin" type="text" value="SEA"/>
	<label for="retDest">Departure</label><input id="retDest" name="returnFlight.destination" type="text" value="DCA"/>
	<label for="retDate">Departure</label><input id="retDate" name="returnFlight.date" type="text" value="2015-05-21"/>
	<label for="retCabin">Preferred Cabin</label>
	<select id="retCabin" name="returnFlight.preferredCabin">
		<options value="COACH" selected>Coach<option>
		<options value="BUSINESS">Business Class<option>
		<options value="FIRST">First Class<option>
	</select>

	<div>Options</div>
	<label for="numPassengers">Departure</label><input id="numPassengers" name="passengers.adultCount" type="text" value="1"/>
	<input id="nonstop" type="checkbox"><label for="nonstop">Non Stop</label>
</form>
```

