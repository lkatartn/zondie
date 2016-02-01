define("zondie", ["d3"], function(d3){

	var h_before = function (height0, AscRate, time){
		return height0+AscRate*time;
	}
	var h_after = function(mass, braking, height0, time){
		var power = mass*9.8 - braking;
		return -power*time*time/2 + height0;
	}
	var braking = function (parachuteRad, ro) {
		return ro*ro*parachuteRad*0.8
	}
	var ro = function (height) {
		var t;
		var p;
		var h = height;
		if (h<11000) {
			t = 15.04-0.00649*h;
			p = 101.29*Math.pow((t+273.1)/288.08, 5.256)
		} else if (h<25000) {
			t = -56.46;
			p = 22.65*Math.exp(1.73-0.000157*h)
		} else if (h > 25000) {
			t = -131.21+0.00299*h;
			p = 2/488*Math.pow((t+273.1)/216.6, -11.388)
		}
		return p/(0.2869 * (t+273.1))
	}
	var p_before = function (wind, position0, time) {
		var windModifier = {
			'n': [0,1],
			'ne': [0.7,0.7],
			'e': [1,0],
			'se': [0.7, -0.7],
			's': [0, -1],
			'sw': [-0.7,-0.7],
			'w': [-1, 0],
			'nw': [-0.7, 0.7]
		};
		var position1 = {};
		position1.x = position0.x+ windModifier[wind.direction][0]*wind.value*time;
		position1.y = position0.y+ windModifier[wind.direction][1]*wind.value*time;
		return position1
	}
	var distance = function (dist0, wind, time) {
		return dist0 + wind.value*time;
	}
	var timing = function(time0, time){
		return time0+time
	}
	var p_after = p_before;


	var normalRandom = d3.random.normal(0,0.1)
	var azimutRandom = d3.random.normal(0,0.8);
	var chance = d3.random.normal(0,1)
	var doOrNot = function(){
		if (Math.abs(chance())>0.4)
			return 1
		else return 0
	}

	return function(AscRate, maxHeight, mass, parachuteRad){
		window.zondie.boom = false;
		window.zondie.height = 0;
		window.zondie.position = {x: 0, y: 0};
		window.zondie.wind = {direction: 'w', value : 1};
		window.zondie.dist = 0;
		window.zondie.time = 0;


		return function (time) {
			var z  = window.zondie;
			if (!z.boom) {
				var h = h_before(z.height, AscRate, time);
				var p = p_before(z.wind, z.position, time)
			} else {
				var density = ro(z.height);
				var brak = braking(parachuteRad, density);
				var h = h_after(mass, brak, z.height, time);
				var p = p_after(z.wind, z.position, time)
			}
			if (h>=maxHeight) z.boom=true;
			if (h<=0) return null;
			z.height = h;
			z.position = p;
			z.time = timing(z.time,time);
			z.dist = distance(z.dist, z.wind, time)
			return {height: h, position: p, dist: z.dist, time: z.time}
		}
	}
});
