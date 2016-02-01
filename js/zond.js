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
	var ascRate=5;
	var mass=0.5;
	var parRad = 1.5;
	var maxHeight=15000;
	var zonder;
	var redraw_p
	var redraw_h;
	var initial = function () {
		window.zondie.wind = utils.getWind();
		ascRate = utils.getAscRate();
		mass = utils.getMass();
		parRad = utils.getParachuteRad();
		maxHeight = utils.getMaxHeight();
		document.getElementsByClassName('overlay')[0].remove();

		zonder = zondie(ascRate, maxHeight, mass, parRad)
		var time = 10;
		data.push(zonder(10))
		redraw_h = height(data);
		redraw_p = position(data)
		window.point = {x:0,y:0}
	}
	document.getElementById('start').onclick = initial;
	var stepper = function(){ 	
		window["text-latitude"].innerHTML = (window.point.y/100+45).toFixed(4)+'°С';
		window["text-longitude"].innerHTML = (window.point.x/100*0.78+30).toFixed(4)+'°В';
		for (var i=0; i < 100; i++) {
			var d = zonder(10)
			if (d==null) {break;}
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