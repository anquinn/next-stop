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
	//var reader = new FileReader();

	console.log(lat);
	console.log(lon);

	// $.getJSON( "assets/json/stops.json", function() {
	//   console.log("success");
	// });


	$.ajax({
        url: 'assets/json/stops.json',
        dataType: 'json',
        success: function(json) {
        	var stop = json.stop_code;
            console.log(stop);
        },
        error: function () {
        	alert("failed!");
        }
    });

	//console.log("after ajax");
}

/* kick shit off */
$(document).ready(function(){
	getLocation();
});

