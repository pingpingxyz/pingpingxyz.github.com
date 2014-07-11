
define(function(require, exports, module) {

	
	// class dashboard
	function dashboard(options) {
		this.ct = options.container; 

		this.render(); 
	}

	dashboard.prototype = {
		render : function() {
			var ct = this.ct; 

			var tpl = [
				'<div class="dashboard">',
					'<div class="banner">',
						'<div class="sub_banner"></div>', 
					'</div>', 
					'<div class="header"></div>', 
					'<div class="body"></div>', 
					'<div class="footer"></div>',
				'</div>', 
			].join(''); 

			this.el = $(tpl).appendTo(ct);

			this.bodyEl = this.el.find('.body'); 
			this.headerEl = this.el.find('.header'); 

			this.renderBody(); 

			this.renderHeader(); 
		}, 

		renderBody : function() {
			var body = require('./body'); 

			var body = this.body = new body({
				container : this.bodyEl
			}); 
		}, 

		renderHeader : function() {
			var header = require('./header'); 

			var header = this.header = new header({
				container : this.headerEl
			})
		}
	}

	module.exports = dashboard; 

})