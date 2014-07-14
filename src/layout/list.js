
define(function(require, exports, module) {

	function list(options) {
		this.ct = options.container; 
		this.render();
	}

	list.prototype = {
		render : function() {
			var ct = this.ct; 

			var tpl = [
				'<div class="list-container">', 
					'<div class="list-navigator"></div>',
					'<div class="list-article"></div>',
				'</div>'
			].join(''); 

			this.el = $(tpl).appendTo(ct); 
		}
	}

	module.exports = list; 

})