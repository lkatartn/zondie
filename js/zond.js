define("zond", ["d3"], function(d3){
	var height= 400;
	var width = 500;
	var padding = 30;
	var x = d3.scale.linear()
	    .domain([0, 200])
	    .range([0, width-2*padding]);

	var y = d3.scale.linear()
	    .domain([0, 10])
	    .range([height-2*padding, 0]);

	var line = d3.svg.line()
	    .x(function(d) { return x(d[0]); })
	    .y(function(d) { return y(d[1]); });

	var xAxis = d3.svg.axis().scale(x).orient('bottom');
	var yAxis = d3.svg.axis().scale(y).orient('left');

	var zondie = function(x) {
		if (x<20) {
			var y =x-20
			return [x,-y*y/100+Math.sqrt(20)]
		}
		return [x,x/200+Math.sqrt(20)]
	}
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
	    .datum(d3.range(200).map(zondie))
	    .attr("class", "line")
	    .attr("transform", "translate("+padding+","+padding+")")
	    .attr("d", line);
})