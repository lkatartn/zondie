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
	var zondSimulationData = d3.range(0, 160,2.5).map(zondie);
	window.data = zondSimulationData;

		height(zondSimulationData);
		position(zondSimulationData)

	var heightPathNode = d3.select("path.line-height").node()
	var posPathNode = d3.select("path.line-pos").node()

	var y = d3.scale.linear()
	    .domain([341,0])
	    .range([0,10]);
	    window.__y=y
	function setPercent(from, to, duration) {
		duration = duration || 100
		var currentPathHeight= utils.setPathPercent(heightPathNode, from, to, duration);
		d3.select(".line-invisible").classed('line-invisible', false);
		var currentPathPosition = utils.setPathPercent(posPathNode, from, to, duration)
		window.point = posPathNode.getPointAtLength(currentPathPosition)
		window.heightPoint = heightPathNode.getPointAtLength(currentPathHeight);
		d3.select(".zond").remove();
		var svgPos = d3.select("svg#position")
		d3.select("svg#position")
			.append("circle")
			.attr("class", "zond")
			.attr("r", 2)
			.attr("cx", window.point.x+ svgPos.attr("width")/2)
			.attr("cy", window.point.y+ svgPos.attr("height")/2)
	}
	var last =0;
	var step =0.03
	var stepper = function(){
		setPercent(last, last+step, 900);
		last+=step;
		window["text-height"].innerHTML = y(window.heightPoint.y).toFixed(2)+'км';
		window["text-latitude"].innerHTML = (window.point.y/100+45).toFixed(4)+'°С';
		window["text-longitude"].innerHTML = (window.point.x/100*0.78+30).toFixed(4)+'°В';
	}
	var interval = setInterval(stepper,1000);

	document.getElementById("stop").onclick = function(){clearInterval(interval)};
	document.getElementById("resume").onclick = function(){
		interval = setInterval(stepper,1000);
	}

	// d3.selectAll("path.line")[0].forEach(function(item) {
	// 	window.a = item;
	// 	utils.setPathPercent(item, 0, 1, 1000)
	// })
})