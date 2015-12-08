requirejs.config({
	baseUrl: "js"
});
require(['zond'],function(zond) {
	window.addEventListener('load',ready)
	function ready() {
		zond();
	}
})