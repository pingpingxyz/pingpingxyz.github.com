
define('index', function(require, exports, module) {

	console.log('index start'); 

	var dashboard = require('layout/dashboard'); 

	var dsb = new dashboard({
		container : $(document.body)
	})

})