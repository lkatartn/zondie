define("zondie",["d3"],function(d3){

	var normalRandom = d3.random.normal(0,0.1)

	return function(dist, range){
		range = 160
		var height = 0;
		if (dist < 40) {
			height = Math.sqrt(dist) - dist*dist/1000 + normalRandom()
		} else
		if (dist < 80) {
			height = dist/range+Math.sqrt(20)+normalRandom()/5
		} else {
			height = 80/range+Math.sqrt(20)+normalRandom()/5
		}
		return {dist: dist, height: height, azimut:height*4-dist/2}
	}
});
