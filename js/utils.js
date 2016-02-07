define("utils",["d3"], function(d3){
	var utils = {
		getWind: function (height){

			var windyScale = d3.scale.linear()
				.domain([
					1000, 2000, 4000, 6000, 
					 8000, 9000, 10000, 11000, 
					  12000, 13000, 14000, 15000, 
					   16000, 17000, 18000, 19000, 
					    20000])
				.range([
					5.7, 6.8, 9.4, 12.6,
					 15.8, 16.8, 17.9, 18.0,
					  16.8, 15.0, 14.0, 13.1,
					   12.3, 12.0, 10.8, 10.6,
					    11.2])
			var windyAng = d3.scale.linear()
				.domain([0, 1000, 4000, 20000])
				.range([Math.PI/8, Math.PI/8 + Math.PI/6, -Math.PI/8, Math.PI-1.8])
			// var windVal = +document.getElementById("wind-val").value;
			// var windDir = document.getElementById("wind-dir").value;
			var windVal = windyScale(height);
			var windDir = windyAng(height);
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