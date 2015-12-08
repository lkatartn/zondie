requirejs.config({
	baseUrl: "js",
	paths: {
		d3 : "../node_modules/d3/d3"
	}
});
require(['zond'],function(zond) {
	window.addEventListener('load',ready)
	function ready() {
		zond();
	}
})