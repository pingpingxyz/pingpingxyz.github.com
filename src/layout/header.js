
define(function(require, exports, module) {

	function header(options) {
		this.ct = options.container; 
		this.render();
	}

	header.prototype = {
		render : function() {
			var ct = this.ct; 

			var tpl = [
				'<div class="container">', 
					'<div class="iconfont">',
						'<a href="www.baidu.com">Layout Blog</a>',
					'</div>', 
					'<ul class="nav">',	
						'<li class="page-item">文章列表</li>', 
						'<li class="page-item">关于博主</li>', 
					'</ul>',
				'</div>'
			].join(''); 

			this.el = $(tpl).appendTo(ct); 


		}
	}

	module.exports = header; 

})