
var converter = new Showdown.converter();

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

			this.initCallback(); 
			this.getJokesList();

			this.bindEvents();
		},

		getJokesList : function() {
			var self = this;

			$.ajax({  
		        type : "get",  
		        async: true,  
		        url : "https://api.github.com/repos/pingpingxyz/pingpingxyz.github.com/contents/jokes?callback=window.blog.getJokesList",  
		        dataType : "jsonp", 
		        jsonp: "window.blog.getJokesList", 
		        success : function(data){  
		        }
		    });  
		}, 

		initCallback : function() {
			var self = this; 

			window.blog = {
				getJokesList : function(data) {
			    	self.parseJokesList(data.data);
			    }, 

			    getLiveList : function(data) {
			    	self.parseLivesList(data.data); 
			    }
			}; 

			window.onhashchange = function(){

				var hash = window.location.hash; 
				if ( !hash || hash.substr(0, 2) !== '#!' ) {
					self.genNavs(); 
					return ;
				}

 				
				if (document.documentElement) {
					document.documentElement.scrollLeft = 0;
					document.documentElement.scrollTop = 0;
				}
				if (document.body) {
					document.body.scrollLeft = 0;
					document.body.scrollTop = 0;
				}
				var noteName = hash.substring(3); 

				self.getOnemdByName(noteName); 
			}
		}, 

		showOneActicle : function(data) {
			// this.articleEl.empty();
			this.resetActicle();

			var content = converter.makeHtml(data);
			var tpl = [
				'<div class="one-acticle"></div>'
			].join('');
			var oneActicleEl = $(tpl).appendTo(this.articleEl); 
			oneActicleEl.html(content);
		}, 


		parseJokesList : function(data) {
			console.log(JSON.stringify(data)); 

			var jokesList = this.jokesList = [], 
				jokesMapping = this.jokesMapping = {},
				dataItem; 
			for (var i = 0; i < data.length; ++i) {
				dataItem = data[i]; 
				var key = this.genKeyByName(dataItem.name); 
				var o = {
					classify : '幽默的地方',
					title : dataItem.name.split('-')[3], 
					time : this.getActicleTime(dataItem), 
					url : 'www.baidu.com', 
					key : key, 
					name : dataItem.name
				}
				jokesMapping[key] = o; 
				jokesList.push(o); 
			}
			// console.log(jokesList);
			this.genNavs(); 
		}, 

		getOnemdByName : function(name) {
			var self = this;

			var url = './jokes/'+name; 
			$.ajax({  
		        type : "get",  
		        async: true,  
		        url : url,
		        success : function(data){  
		        	self.showOneActicle(data);
		        }
		    });  
		}, 

		getActicleTime : function(dataItem) {
			var timeArr = dataItem.name.split('-'); 
			return timeArr[0] + timeArr[1] + timeArr[2]; 
		}, 

		parseLivesList : function(data) {
			console.log(JSON.stringify(data)); 
		},

		genKeyByName : function(name) {
			return name.replace(/\s+/g, '_'); 
		}, 

		genNavs : function() {
			this.resetActicle();

			var data = this.jokesList; 
			for (var i = 0; i < data.length; i++) {
				this.genArticleNav2(data[i]);
			}
		},

		resetActicle : function() {
			this.articleEl.empty();
		}, 

		bindEvents : function() {
			var self = this;
			this.articleEl.bind('click', function(e) {

				var jokesMapping = self.jokesMapping; 
				var etar = $(e.target); 

				if ( !etar.hasClass('title') ) return;
				
				var acticleItem = etar.closest('.article-item'); 
				if (acticleItem.length) {
					var className = acticleItem[0].className;
					var key = className.replace(/article-item/g, '').replace(/short/g, '').replace(/\s+/g, ''); 
					console.log(jokesMapping[key]);
					// self.getOnemdByName(jokesMapping[key].name);
					self.linkedActicle(key);
				}
			})
		}, 

		linkedActicle : function(key) {
			var jokesMapping = this.jokesMapping;  
			var actInfo = jokesMapping[key]; 
			window.location.href = '/#!/'+actInfo.name;
		}, 

		genArticleNav2 : function(data) {
			var classify = data.classify, 
				title = data.title, 
				time = data.time, 
				url = data.url, 
				key = data.key; 

			var tpl = [
				'<div class="article-item short {4}">',
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

			$(String.format(tpl, classify, title, time, url, key)).appendTo(this.articleEl); 
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
		}


	}

	module.exports = list; 
})


