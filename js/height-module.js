define(["d3"], function(d3) {
	return function() {
	var height= 400;
	var width = 500;
	var padding = 30;
	var time = 160;
	var x = d3.scale.linear()
	    .domain([0, time])
	    .range([0, width-2*padding]);

	var y = d3.scale.linear()
	    .domain([0, 10])
	    .range([height-2*padding, 0]);

	var line = d3.svg.line()
		.interpolate("basis")
	    .x(function(d) { return x(d[0]); })
	    .y(function(d) { return y(d[1]); });

	var xAxis = d3.svg.axis().scale(x).orient('bottom');
	var yAxis = d3.svg.axis().scale(y).orient('left');
	var normalRandom = d3.random.normal(0,0.1)
	var zondie = function(x) {
		if (x < 40) {
			var y =Math.sqrt(x)
			return [x,y - x*x/1000 + normalRandom()]
		} else
		if (x < 80) {
			return [x,x/time+Math.sqrt(20)+normalRandom()/5]
		} else
		return [x , 80/time+Math.sqrt(20)+normalRandom()/5]
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
	    .datum(d3.range(time).map(zondie))
	    .attr("class", "line")
	    .attr("transform", "translate("+padding+","+padding+")")
	    .attr("d", line);
	}
})