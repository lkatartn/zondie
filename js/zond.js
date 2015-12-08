define("zond", ["d3"], function(d3){
	var xAxis = d3.svg.axis();
	d3.select("svg#height")
		.append('g')
		.attr('transform', 'translate(200,10)')
		.call(xAxis);
})