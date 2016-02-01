define(["d3", "zondie"], function(d3, zondie) {
	
	return function(zondData) {
	var height= 400;
	var width = 500;
	var padding = 30;
	var time = 25;
	var maxHeight = 32;
	var x = d3.scale.linear()
	    .domain([0, time])
	    .range([0, width-2*padding]);

	var y = d3.scale.linear()
	    .domain([0, maxHeight])
	    .range([height-2*padding, 0]);

	var line = d3.svg.line()
		// .interpolate("basis")
	    .x(function(d) { return x(d.dist/1000); })
	    .y(function(d) { return y(d.height/1000); });

	var xAxis = d3.svg.axis().scale(x).orient('bottom');
	var yAxis = d3.svg.axis().scale(y).orient('left');
	var svg = d3.select("svg#height");
	svg.append("g")
	    .attr("class", "axis axis--y")
	    .attr("transform", "translate("+padding+","+padding+")")
	    .call(yAxis);

	svg.append("g")
	    .attr("class", "axis axis--x")
	    .attr("transform", "translate("+padding+","+(height-padding)+")")
	    .call(xAxis);

	svg.append("path")
	    .datum(zondData)
	    .attr("class", "line line-height ")
	    .attr("transform", "translate("+padding+","+padding+")")
	    .attr("d", line);
	return function(datum) {
		d3.select("path.line-height").remove();
		svg.append("path")
	    .datum(datum)
	    .attr("class", "line line-height ")
	    .attr("transform", "translate("+padding+","+padding+")")
	    .attr("d", line);
	}
	}
})