define("position", ["d3"],function(d3){
	d3.select("svg#position")
		.append("circle")
		.attr("class", "zond")
		.attr("r", 2)
		.attr("cx", 100)
		.attr("cy", 100)

	var height= 400;
	var width = 500;
	var time = 160;
	var padding = 30;
    var radius = Math.min(width, height) / 2 - 30;

    var x = d3.scale.linear()
	    .domain([0, 0.5])
	    .range([0, width/2-2*padding]);

	var y = d3.scale.linear()
	    .domain([0, 10])
	    .range([height/2-2*padding, 0]);

    var line = d3.svg.line()
		.interpolate("basis")
	    .x(function(d) { return x(d[0]); })
	    .y(function(d) { return y(d[1]); });

	var data = d3.range([0, 160, 1]).map(function(elem) {
		return [elem, elem/1000];
	})
	var r = d3.scale.linear()
	    .domain([0, .5])
	    .range([0, radius]);
	// var line = d3.svg.line.radial()
	//     .radius(function(d) { return r(d[1]); })
	//     .angle(function(d) { return -d[0] + Math.PI / 2; });
	var svg = d3.select("svg#position")
		.append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	var gr = svg.append("g")
	    .attr("class", "r axis-pos")
		.selectAll("g")
	    .data(r.ticks(5).slice(1))
		.enter().append("g");
	gr.append("circle")
	    .attr("r", r);
	gr.append("text")
	    .attr("y", function(d) { return -r(d) - 4; })
	    .attr("transform", "rotate(15)")
	    .style("text-anchor", "middle")
	    .text(function(d) { return d; });
	var ga = svg.append("g")
	    .attr("class", "a axis-pos")
	  .selectAll("g")
	    .data(d3.range(0, 360, 30))
	  .enter().append("g")
	    .attr("transform", function(d) { return "rotate(" + -d + ")"; });
	ga.append("line")
	    .attr("x2", radius);
	ga.append("text")
	    .attr("x", radius + 6)
	    .attr("dy", ".35em")
	    .style("text-anchor", function(d) { return d < 270 && d > 90 ? "end" : null; })
	    .attr("transform", function(d) { return d < 270 && d > 90 ? "rotate(180 " + (radius + 6) + ",0)" : null; })
	    .text(function(d) { return d + "°"; });
	svg.append("path")
	    .datum(data)
	    .attr("class", "line")
	    .attr("d", line);
})