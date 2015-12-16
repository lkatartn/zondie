define("zondie", ["d3"], function(d3){

	var normalRandom = d3.random.normal(0,0.1)
	var azimutRandom = d3.random.normal(0,0.8);
	var chance = d3.random.normal(0,1)
	var doOrNot = function(){
		if (Math.abs(chance())>0.4)
			return 1
		else return 0
	}

	return function(dist, range){
		range = 160
		var height = function(distance) {
			if (distance < 40) {
				return Math.sqrt(distance) - distance*distance/1000 + normalRandom()
			} else
			if (distance < 80) {
				return distance/range+Math.sqrt(20)+normalRandom()/5
			} else {
				return 80/range+Math.sqrt(20)+normalRandom()/5
			}
		};
		var azimut = function(distance, height) {
			return height(distance)*4 - distance/2+ doOrNot()*azimutRandom()
		}
		return {dist: dist, height: height(dist), azimut: azimut(dist, height)}
	}
});
