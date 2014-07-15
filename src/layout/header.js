
define(function(require, exports, module) {

	function header(options) {
		this.ct = options.container; 
		this.render();
		this.bindEvents();
	}

	header.prototype = {
		render : function() {
			var ct = this.ct; 

			var tpl = [
				'<div class="container">', 
					'<div class="iconfont">',
						'<a href="www.baidu.com">博客家园</a>',
					'</div>', 
					'<ul class="nav">',	
						'<li class="page-item current_page_item">文章列表</li>', 
						'<li class="page-item">关于博主</li>', 
					'</ul>',
				'</div>'
			].join(''); 

			this.el = $(tpl).appendTo(ct); 

			this.ulEl = this.el.find('.nav'); 
		}, 

		bindEvents : function() {
			var self = this; 

			this.ulEl.bind('click', function(e) {
				var etar = $(e.target); 

				if (etar.hasClass('page-item')) {
					var liItems = self.ulEl.find('>li'),
						li_item; 

					for (var i = 0; i < liItems.length; ++i) {
						li_item = $(liItems[i]); 
						li_item.removeClass('current_page_item'); 
					}
					etar.addClass('current_page_item'); 
				}
			})
		}
	}

	module.exports = header; 

})