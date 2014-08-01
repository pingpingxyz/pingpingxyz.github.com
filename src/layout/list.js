
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

		genArticleNav2 : function(data) {

			data = {
				classify : '生活小结',
				title : '哈哈', 
				time : '2014-7-30', 
				url : 'www.baidu.com'
			}
			var classify = data.classify, 
				title = data.title, 
				time = data.time, 
				url = data.url;

			var tpl = [
				'<div class="article-item short">',
					'<h2>', 
						'<a class="label">',
							'{0}',
							'<i class="label-arrow"></i>',
						'</a>',
						'<a class="title">{1}</a>',
					'</h2>',
					'<div class="postCon"><div class="c_b_p_desc">摘要: FineUI（专业版）是由三生石上全新打造的基于 jQuery 的专业 ASP.NET 控件库，计划在七月下旬正式发布。选择FineUI（专业版）的四大理由：1.简单：专业版和开源版兼容（v4.x），您现在就可以使用开源版进行开发，等正式版发布时只需替换 DLL 即可。2.极速：专业版基于 jQue...<a href="{3}" class="c_b_p_desc_readmore">阅读全文</a></div></div>',
					'<div class="clear"></div>',
					'<div class="postDesc">posted @ {2} by WLin</div>',
				'</div>'
			].join(''); 

			$(String.format(tpl, classify, title, time, url)).appendTo(this.articleEl); 
		}, 

		genArticleNav : function() {
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
				this.genArticleNav2();
			}
		}
	}

	module.exports = list; 
})