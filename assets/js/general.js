

/* if browser has geolocation then get current location */
function getLocation() {
	if (Modernizr.geolocation) {
		navigator.geolocation.getCurrentPosition(currentLocation, handle_error,   {timeout:10000});
		console.log ("browser has geolocation")
		$('#loading').fadeIn();
	}
	else {
		/* trigger manual entry if no geolocation */
		console.log("no geolocation available");
		$('#address').fadeIn();
	}
}

/* if geolocation error trigger manual entry */
function handle_error(err) {
	$('#loading').hide();
	$('#address').fadeIn();
	showError("Can't find your location.");
	console.log ("can't find location")
	if (err.code == 0) {
		console.log("unknown")
	}
	if (err.code == 1) {
		console.log("denied")
	}
	if (err.code == 2) {
		console.log("unreliable")
	}
	if (err.code == 3) {
		console.log("taking ages")
	}
}

/* get current location */
function currentLocation(position){
		
		$('#button').fadeOut();
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		//currentlatlng = new google.maps.LatLng(latitude, longitude);
		console.log ("current position is: " + currentlatlng)
		//show_map(currentlatlng);
}

/* kick shit off */
$(document).ready(function(){
	getLocation();
});
