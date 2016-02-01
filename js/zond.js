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
	var zonder = zondie(5, 22000, 0.5, 2.3)
	var time = 10;
	data.push(zonder(10))
	var redraw_h = height(data);
	var redraw_p = position(data)
	window.point = {x:0,y:0}
	window.zondiespeed = 0.01
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