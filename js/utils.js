define("utils",["d3"], function(d3){
	var utils = {
		getWind: function (){
			var windVal = +document.getElementById("wind-val").value;
			var windDir = document.getElementById("wind-dir").value;
			return { value: windVal, direction: windDir}
		},
		getAscRate: function() {
			var ascRate = +document.getElementById("asc-rate").value;
			return ascRate;
		},
		getMass: function(){
			var mass = +document.getElementById("mass").value;
			return mass;
		},
		getMaxHeight: function () {
			var maxHeight = +document.getElementById("max-height").value;
			return maxHeight
		},
		getParachuteRad : function () {
			var parRad = +document.getElementById("parachute-rad").value;
			return parRad;
		},
		getGeoCoords: function (){
			var lat1 = +document.getElementById("latitude-init").value;
			var long1 = +document.getElementById("longtitude-init").value;
			return {latitude: lat1, longtitude : long1}
		},
		metersToGeo: function(dx, dy, latitude, longtitude) {
			var lat1 = latitude + dy /1000 /111.1;
			var long1 = longtitude + dx / (Math.cos(((lat1+latitude)/2)/180*Math.PI)*111*1000); 
			return {latitude: lat1, longtitude : long1}
		}
	}
	return utils
})