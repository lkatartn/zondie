define("position", ["d3","zondie"],function(d3,zondie){
return function(zondData) {
	var height= 400;
	var width = 500;
	var time = 170;
	var padding = 30;
    var radius = Math.min(width, height) / 2 - padding;

  //   d3.select("svg#position")
		// .append("circle")
		// .attr("class", "zond")
		// .attr("r", 2)
		// .attr("cx",407)
		// .attr("cy", 139.33)


    var x = d3.scale.linear()
	    .domain([0, time])
	    .range([0, radius]);

	var y = d3.scale.linear()
	    .domain([0, time])
	    .range([0, radius]);

    var line = d3.svg.line()
		// .interpolate("cardinal")
	    .x(function(d) { return x(d.dist); })
	    .y(function(d) { return y(d.azimut); });

	// var data = d3.range([0, 160, 1]).map(function(elem) {
	// 	return [elem, elem/1000];
	// })
	var dist = d3.random.normal(0, 5)
	var norm = d3.random.normal(0.01, 0.01)
	var data = zondData;

	var r = d3.scale.linear()
	    .domain([0, time])
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
	    .data(r.ticks(10).slice(1))
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
	    .attr("class", "line line-pos line-invisible")
	    .attr("d", line);
	}
})