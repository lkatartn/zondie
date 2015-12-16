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
	var zondSimulationDataPosition = d3.range(0, 136,2.5).map(zondie);
	height(zondSimulationData);
	position(zondSimulationData)
	d3.selectAll("path.line")[0].forEach(function(item) {
		window.a = item;
		utils.setPathPercent(item, 0, 1, 1000)
	})
})