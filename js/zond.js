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
		height(zondSimulationData);
		position(zondSimulationData);
		

	var heightPathNode = d3.select("path.line-height").node()
	var posPathNode = d3.select("path.line-pos").node()
	setPercent(0,0,0)
	function setPercent(from, to, duration) {
		duration = duration || 100
		utils.setPathPercent(heightPathNode, from, to, duration);
		var currentPathPosition = utils.setPathPercent(posPathNode, from, to, duration)
		var svgPoint = posPathNode.getPointAtLength(currentPathPosition)
		console.log(svgPoint)
		d3.select(".zond").remove();
		var svgPos = d3.select("svg#position")
		d3.select("svg#position")
			.append("circle")
			.attr("class", "zond")
			.attr("r", 2)
			.attr("cx", svgPoint.x+ svgPos.attr("width")/2)
			.attr("cy", svgPoint.y+ svgPos.attr("height")/2)
	}
	var last =0
	window.zondiespeed = 0.01
	// setPercent(0,1,10000)
	setInterval(function(){
		setPercent(last, last+window.zondiespeed, 500);
		last+=window.zondiespeed;
	},1000)

	// d3.selectAll("path.line")[0].forEach(function(item) {
	// 	window.a = item;
	// 	utils.setPathPercent(item, 0, 1, 1000)
	// })
})