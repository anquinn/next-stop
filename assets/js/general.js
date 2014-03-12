/* get current location */
function currentLocation(position){
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		//currentlatlng = new google.maps.LatLng(latitude, longitude);
		console.log ("current position is: " + latitude + ", " + longitude);
		//show_map(currentlatlng);
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

/* kick shit off */
$(document).ready(function(){
	getLocation();
});
