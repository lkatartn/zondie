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
		}
	}
	return utils
})