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
        	var a = 0;					/* Haversine formula to calc the shortest distance over the Earth's surface between two points */
        	var c = 0;					/* Further part of formula */
        	var d = 0;					/* Distance between the two points */
        	var currCloseStop = null;	/* Closest stop to user (JSON object) */

            for (i = 0; i < json.length; i++){
	            
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
            console.log(currCloseStop.stop_code);
            console.log(currCloseStop.stop_name);

            $("#closest-stop").html(currCloseStop.stop_name);
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
}
