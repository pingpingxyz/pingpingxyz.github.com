define(function(require, exports, module) {

	var sideBar = require('./sideBar'),
		list = require('./list'); 

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
			this.listEl = this.el.find('.list');

			this.renderSideBar();
			this.renderList();

		},

		renderSideBar: function() {

			this.sideBar = new sideBar({
				container: this.sideEl
			})
		}, 

		renderList : function() {
			this.list = new list({
				container: this.listEl
			})
		}
	}

	module.exports = body;

})