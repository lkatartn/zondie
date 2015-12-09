define("position", ["d3"],function(d3){
	d3.select("svg#position")
		.append("circle")
		.attr("class", "zond")
		.attr("r", 2)
		.attr("cx", 100)
		.attr("cy", 100)
})