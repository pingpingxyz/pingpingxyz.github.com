
define(function(require, exports, module) {

	function sideBar(options) {
		this.ct = options.container; 
		this.render();
	}

	sideBar.prototype = {
		render : function() {
			var ct = this.ct; 

			var tpl = [
				'<div class="side-container">', 

					'<div class="block category">',
					    '<div class="title">文章分类<label for="category" class="iconfont"><i></i><b></b></label></div>',
					    '<ul>',
					        '<li><a href="####">墨·Javascript</a></li>',
					        '<li><a href="####">墨·WEB综合</a></li>',
					        '<li><a href="####">墨·其他</a></li>',    
					    '</ul>',
					'</div>',

					'<div class="block tag">',
					    '<div class="title">标签<label for="tag" class="iconfont"><i></i><b></b></label></div>',
					    '<div class="tags">',
					        '<a href="" class="tag-link-15" title="1个话题" style="font-size: 12px;">linux</a>',
							'<a href="" class="tag-link-19" title="1个话题" style="font-size: 12px;">PHP</a>',
							'<a href="" class="tag-link-16" title="1个话题" style="font-size: 12px;">svn</a>',
							'<a href="" class="tag-link-17" title="2个话题" style="font-size: 12px;">嵌入式WEB</a>',
							'<a href="" class="tag-link-20" title="1个话题" style="font-size: 12px;">快捷键</a>',
							'<a href="" class="tag-link-14" title="1个话题" style="font-size: 12px;">正则</a>',
							'<a href="" class="tag-link-18" title="1个话题" style="font-size: 12px;">版本控制</a>',
							'<a href="" class="tag-link-13" title="2个话题" style="font-size: 12px;">面试</a>',
						'</div>',
					'</div>',

					'<div class="block calendar-wrap"></div>', 

					'<div class="clock-wrap">',
						'<object height="180" width="180" align="center" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0">',
				            '<object type="application/x-shockwave-flash" data="./style/clock.swf" style="width:250px; height:250px;opacity:0.7;">',
				        '</object>',
					'</div>',

				'</div>'
			].join(''); 

			this.el = $(tpl).appendTo(ct); 

			this.datePickerEl = this.el.find('.calendar-wrap'); 

			this.renderDatePicker();
		}, 

		renderDatePicker : function() {

			new Kalendae({
				attachTo: this.datePickerEl[0],
				months:1,
				mode:'day',
				selected:Kalendae.moment().subtract({M:1})
			});
		}
	}

	module.exports = sideBar; 

})