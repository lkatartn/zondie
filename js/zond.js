define(["d3",
	"zondie",
	"height-module",
	"position",
	"utils"],
	function(d3,
	 	zondie,
		height,
	   	position,
	   	utils)
	{
	window.data = [];
	window.zondie = {};
	window.zondiespeed=8;
	var ascRate=5;
	var mass=0.5;
	var parRad = 1.5;
	window.maxHeight=15000;
	var zonder;
	var redraw_p
	var redraw_h;
	var geo;

	var initial = function () {
		window.zondie.wind = utils.getWind(0);
		ascRate = utils.getAscRate();
		mass = utils.getMass();
		parRad = utils.getParachuteRad();
		maxHeight = utils.getMaxHeight();
		geo = utils.getGeoCoords();
		document.getElementsByClassName('overlay')[0].remove();

		zonder = zondie(ascRate, maxHeight, mass, parRad)
		data.push(zonder(10))
		document.getElementById("resume").click();
	}
	document.getElementById('start').onclick = initial;
	var stepper = function(){ 	
		window["text-latitude"].innerHTML = (geo.latitude).toFixed(4)+'°';
		window["text-longitude"].innerHTML = (geo.longtitude).toFixed(4)+'°';
		window["text-height"].innerHTML = window.zondie.height.toFixed(1)+'м';
		d3.selectAll("#height *").remove();
		redraw_h = height(data);
		d3.selectAll("#position *").remove();
		redraw_p = position(data);
		var svg_height = d3.select('#height');
		svg_height.append("text")
		    .attr("x", 15)
		    .attr("y", 15 )
		    .attr("text-anchor", "right")
		    .style("font-size", "18px")
		    .text("График высоты");
		svg_height.append("text")
			.attr("x", 35)
			.attr("y", 40)
			.attr("text-anchor", "right")
		    .style("font-size", "12px")
		    .text("высота, км");
		svg_height.append("text")
			.attr("x", 415)
			.attr("y", 362)
			.attr("text-anchor", "right")
		    .style("font-size", "12px")
		    .text("длина пути, км");

		var svg_pos = d3.select('#position');
		svg_pos.append("text")
		    .attr("x", 15)
		    .attr("y", 15 )
		    .attr("text-anchor", "right")
		    .style("font-size", "18px")
		    .text("График позиционирования");
		for (var i=0; i < window.zondiespeed; i++) {
			var d = zonder(10)
			if (d==null) {
				window["text-latitude"].innerHTML = (geo.latitude).toFixed(4)+'°';
				window["text-longitude"].innerHTML = (geo.longtitude).toFixed(4)+'°';
				window["text-height"].innerHTML = window.zondie.height.toFixed(1)+'м';
				document.getElementById("stop").click();
				console.log(window.zondie.time);
				break;
			}
			var last_data = window.data[window.data.length-1];
			window.zondie.wind = utils.getWind(last_data.height);
			geo = utils.metersToGeo(last_data.dx, last_data.dy, geo.latitude, geo.longtitude)
			window.data.push(d)
			redraw_p(window.data);
			redraw_h(window.data) 
		};
	}

	document.getElementById("stop").onclick = function(){clearInterval(interval)};
	document.getElementById("resume").onclick = function(){
		interval = setInterval(stepper,1000);
	}

	
})