
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
			this.articleEl = this.el.find('.list-article'); 

			this.genNavs()
		},

		genArticleNav : function(data) {
			var tpl = [
				'<div class="article-item">',
					'<h2>', 
						'<a class="label">',
							'生活小结',
							'<i class="label-arrow"></i>',
						'</a>',
						'<a class="title">整理一下嵌入式WEB开发中的各种屏蔽</a>',
					'</h2>',
					'<div class="intro">', 
						'<a>',
							'<img class="intro_img" width="200" height="150" src="./style/images/arcticle_img_1.png">',
						'</a>', 
						'<p>每次做客户端WEB页，总会遇到QA提出的BUG，“F5没屏、右键菜单没屏、怎么还能选中呢、我去。你屏蔽了选择、这input里面的内容也不能选了，这不科学。你看，你看，我可以把这个图片托到桌面”。可能，以后，再也听不到这种声音了。。。不是QA挂了，是我有对策了，哈哈。 为什么要屏蔽各种热键 在嵌入式WEB中，要高仿原生的效果，所以，网页上的这些热键就显得不那么…</p>', 
						'<div class="info"></div>',
					'</div>', 
				'</div>'
			].join(''); 

			$(tpl).appendTo(this.articleEl); 
		}, 

		genNavs : function() {

			for (var i = 0; i < 5; i++) {
				this.genArticleNav();
			}
		}
	}

	module.exports = list; 
})