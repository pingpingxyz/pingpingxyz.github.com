define(function(require, exports, module) {

	var sideBar = require('./sideBar');

	function body(options) {
		this.ct = options.container;
		this.render();
	}

	body.prototype = {
		render: function() {
			var ct = this.ct;

			var tpl = [
				'<div class="container">',
				'<div class="list"></div>',
				'<div class="side">',
					'<object height="180" width="180" align="center" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0">',
			            '<param value="style/clock.swf" name="movie">',
			        '</object>',
				'</div>'
			].join('');

			this.el = $(tpl).appendTo(ct);

			this.sideEl = this.el.find('.side');

			this.renderSideBar();

		},

		renderSideBar: function() {

			this.sideBar = new sideBar({
				container: this.sideEl
			})
		}
	}

	module.exports = body;

})