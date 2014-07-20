
define(function(require, exports, module) {


	var header = require('./header'), 
		body = require('./body'), 
		musicPlayer = require('./musicPlayer'); 

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
					'<div class="music_qq"></div>',
				'</div>', 
			].join(''); 

			this.el = $(tpl).appendTo(ct);

			this.bodyEl = this.el.find('.body'); 
			this.headerEl = this.el.find('.header'); 
			this.musicEl = this.el.find('.music_qq');

			this.renderBody(); 
			this.renderHeader(); 
			this.renderMusicPlayer();
		}, 

		renderBody : function() {
			this.body = new body({
				container : this.bodyEl
			}); 
		}, 

		renderHeader : function() {
			this.header = new header({
				container : this.headerEl
			})
		}, 

		renderMusicPlayer : function() {
			this.musicPlayer = new musicPlayer({
				container : this.musicEl
			})
		}
	}

	module.exports = dashboard; 

})