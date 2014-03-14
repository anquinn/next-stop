/* get current location */
function currentLocation(position){
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		//currentlatlng = new google.maps.LatLng(latitude, longitude);
		console.log ("current position is: " + latitude + ", " + longitude);
		//show_map(currentlatlng);

		findClosest(latitude,longitude);
}

/* if geolocation error trigger manual entry */
function handle_error(err) {
	console.log ("can't find location");
	if (err.code === 0) {
		console.log("unknown");
	}
	if (err.code === 1) {
		console.log("denied");
	}
	if (err.code === 2) {
		console.log("unreliable");
	}
	if (err.code === 3) {
		console.log("taking ages");
	}
}

/* if browser has geolocation then get current location */
function getLocation() {
	if (Modernizr.geolocation) {
		navigator.geolocation.getCurrentPosition(currentLocation, handle_error,   {timeout:10000});
		console.log ("browser has geolocation");
	}
	else {
		/* trigger manual entry if no geolocation */
		console.log("no geolocation available");
	}
}

function findClosest(lat, lon){

	$.ajax({
		url: 'assets/json/stops.json',
		dataType: 'json',
		success: function(json) {
			var closestStop = 50;		/* Distance placeholder */
			var diffLat = 0;			/* Distance of the latitude from user to stop */
			var diffLon = 0;			/* Distance of the longititude from user to stop */
			var R = 6371;				/* Radius of the Earth in KM */
			var stopLat = 0;			/* Bus stop's latitude */
			var userLat = lat.toRad();	/* Bus stop's latitude */
			var a = 0;					/* Haversine formula to calc the shortest distance over 
											the Earth's surface between two points */
			var c = 0;					/* Further part of formula */
			var d = 0;					/* Distance between the two points */
			var currCloseStop = null;	/* Closest stop to user (JSON object) */

			for (var i = 0; i < json.length; i++){

				diffLat = (lat - json[i].stop_lat).toRad();
				diffLon = (lon - json[i].stop_lon).toRad();
				stopLat = json[i].stop_lat.toRad();
				userLat = lat.toRad();

				/* Haversine formula to calc the shortest difference over the Earth's surface between two points */
				a = Math.sin(diffLat/2) * Math.sin(diffLat/2) +
					Math.sin(diffLon/2) * Math.sin(diffLon/2) * Math.cos(stopLat) * Math.cos(userLat);
				c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
				d = R * c;

				if (d < closestStop){
					closestStop = d;
					currCloseStop = json[i];
				}
			}
			
			/* Outputting the stop code and name for closest stop */
			// console.log(currCloseStop.stop_code);
			// console.log(currCloseStop.stop_name);

			$("#closest-stop").html(currCloseStop.stop_name);

			getBusList(currCloseStop, json);

		},
		error: function () {
			alert("failed!");
		}
	});


}

/* kick shit off */
$(document).ready(function(){
	getLocation();
});



Number.prototype.toRad = function() {
	return this * Math.PI / 180;
};


function crossWithStopTime(busList){
	$.ajax({
		url: 'assets/json/stop_times.json',
		dataType: 'json',
		success: function(json){
			var i = 0;
			var j = 0;
			var stopCount = 0;
			var date = new Date();
			var currDate = date.toLocaleTimeString();

			console.log("Current Time: " + currDate);
			for( i = 0; i < busList.length; i++){
				for(j = 0; j < json.length; j++){

					if((busList[i].stop_id === json[j].stop_id)){
						// console.log("currDate: " + currDate);
						// console.log("stopDate: " + json[j].arrival_time);
						if(currDate <= json[j].arrival_time){
							if(stopCount < 3){
								console.log("stop id: " + json[j].stop_id);
								console.log("arrival time: " + json[j].arrival_time);
								stopCount += 1;
							}
							else{
								break;
							}
						}
					}
				}
				stopCount = 0;
			}

		},
		error: function(){
			console.log("Error");
		}
	});
}


/* busStopInfo is a json object which contains the information for the closest stop 
   allStops is the json data read in from the file (removing redunduncy of re-reading a file)
*/
function getBusList(busStopInfo, allStops){
	var busList = [];
	var i = 0;
	var j = 0;

	for(i = 0; i < allStops.length; i++){
		if(busStopInfo.stop_id === allStops[i].stop_id){
			busList[j] = allStops[i];
		}
	}
	crossWithStopTime(busList);
}
