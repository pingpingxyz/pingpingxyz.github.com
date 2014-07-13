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
				'<div class="side"></div>'
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