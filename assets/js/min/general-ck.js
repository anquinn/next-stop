function getLocation(){Modernizr.geolocation?(navigator.geolocation.getCurrentPosition(currentLocation,handle_error,{timeout:1e4}),console.log("browser has geolocation"),$("#loading").fadeIn()):(console.log("no geolocation available"),$("#address").fadeIn())}function handle_error(o){$("#loading").hide(),$("#address").fadeIn(),showError("Can't find your location."),console.log("can't find location"),0==o.code&&console.log("unknown"),1==o.code&&console.log("denied"),2==o.code&&console.log("unreliable"),3==o.code&&console.log("taking ages")}function currentLocation(o){$("#button").fadeOut();var n=o.coords.latitude,e=o.coords.longitude;console.log("current position is: "+n+", "+e)}$(document).ready(function(){getLocation()});