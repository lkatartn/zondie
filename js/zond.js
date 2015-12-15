define(["d3","zondie","height-module","position"], function(d3, zondie, height, position){
	var zondSimulationData = d3.range(0, 160,2.5).map(zondie);
	var zondSimulationDataPosition = d3.range(0, 136,2.5).map(zondie);
	height(zondSimulationData);
	position(zondSimulationData)
})