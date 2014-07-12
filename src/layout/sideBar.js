
define(function(require, exports, module) {

	function sideBar(options) {
		this.ct = options.container; 
		this.render();
	}

	sideBar.prototype = {
		render : function() {
			var ct = this.ct; 

			var tpl = [
				'<div class="side-container">', 
					'<div class="calendar-wrap"></div>', 
					'<div class="clock-wrap"></div>',
				'</div>'
			].join(''); 

			this.el = $(tpl).appendTo(ct); 

		}
	}

	module.exports = sideBar; 

})