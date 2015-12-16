define("utils",["d3"], function(d3){
	var utils = {
		setPathPercent: function(path, from, to, duration) {
			duration = duration || 1000;
			var totalLength = path.getTotalLength();

		    d3.select(path)
		      .attr("stroke-dasharray", totalLength*(from) + " " + totalLength*(1-from))
		      .transition()
		        .duration(duration)
		        .ease("linear")
		        .attr("stroke-dasharray", totalLength*(to) + " " + totalLength*(1-to));
		    return totalLength*to
		}

	}
	return utils
})