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
	var dataPercent = d3.scale.quantize()
		.domain([0,1])
		.range(zondSimulationData)

		height(zondSimulationData);
		position(zondSimulationData)

	var heightPathNode = d3.select("path.line-height").node()
	var posPathNode = d3.select("path.line-pos").node()

	function setPercent(from, to, duration) {
		duration = duration || 100
		utils.setPathPercent(heightPathNode, from, to, duration);
		d3.select(".line-invisible").classed('line-invisible', false);
		var currentPathPosition = utils.setPathPercent(posPathNode, from, to, duration)
		var svgPoint = posPathNode.getPointAtLength(currentPathPosition)
		d3.select(".zond").remove();
		var svgPos = d3.select("svg#position")
		d3.select("svg#position")
			.append("circle")
			.attr("class", "zond")
			.attr("r", 2)
			.attr("cx", svgPoint.x+ svgPos.attr("width")/2)
			.attr("cy", svgPoint.y+ svgPos.attr("height")/2)
	}
	var last =0;
	var step =0.03
	var stepper = function(){
		setPercent(last, last+step, 900);
		last+=step;
		window["text-height"].innerHTML=dataPercent(last).height;
		window["text-latitude"].innerHTML=dataPercent(last);
		window["text-longitude"].innerHTML=dataPercent(last);
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