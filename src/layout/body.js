
define(function(require, exports, module) {

	function body(options) {
		this.ct = options.container; 
		this.render();
	}

	body.prototype = {
		render : function() {
			var ct = this.ct; 

			var tpl = [
				'<div class="container">', 
					'<div class="list"></div>', 
					'<div class="side"></div>',
				'</div>'
			].join(''); 

			this.el = $(tpl).appendTo(ct); 


		}
	}

	module.exports = body; 

})